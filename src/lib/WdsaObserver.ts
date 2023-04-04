import { WdsaAnimator } from './WdsaAnimator'
import { WdsaObserverOptions } from './Interfaces/WdsaObserverOptions'
import { WdsaAnimatorOptions } from './Interfaces/WdsaAnimatorOptions'
import { generateLibName } from './utilities/libNameGenarator'
import { WdsaBasic } from './WdsaBasic'

export class WdsaObserver extends WdsaBasic<WdsaObserverOptions> {
  // @ts-ignore
  public static readonly libName = generateLibName('wdsa_observer')
  
  protected _defaultOptions: Partial<WdsaObserverOptions> = {
    scrollRoot: window
  } as Partial<WdsaObserverOptions>
  
  /**
   * HTMLElement used to show the debug information
   * @private
   */
  private _debugEl!: HTMLElement & { stickyDiv?: HTMLElement }
  
  /**
   * List of animators instances
   * @private
   */
  private _animators: WdsaAnimator[] = []
  
  constructor (options: WdsaObserverOptions) {
    super('observer', options)
    
    this._initAnimators()
    this._initDebugger()
  }
  
  /**
   * Return the container element
   */
  get container (): HTMLElement {
    return this._options.container
  }
  
  /**
   * Get the position of the container relative to the viewport
   * @returns {{top: number, bottom: number, height: number, width: number}}
   */
  get containerRect (): DOMRect {
    return this._options.container.getBoundingClientRect()
  }
  
  /**
   * Get the position of the container relative to the page
   * @returns {{top: number, bottom: number, height: number, width: number}}
   */
  get containerOffset (): { top: number, bottom: number, height: number, width: number } {
    return {
      top: this._options.container.offsetTop,
      bottom: this._options.container.offsetTop + this._options.container.offsetHeight,
      height: this._options.container.offsetHeight,
      width: this._options.container.offsetWidth
    }
  }
  
  get scrollRootY (): number {
    if (this._options.scrollRoot) {
      if (this._options.scrollRoot instanceof Window) {
        return window.scrollY
      }
      
      return this._options.scrollRoot.scrollTop
    }
    
    return window.scrollY
  }
  
  /**
   * Return the scroll percentage based on the percentage of the container that is visible
   */
  get scrollPercent (): number {
    let scrollY = 0 - this.containerRect.top
    const allowNegativeStart = this._options.elements?.some((elementOptions) => {
      return elementOptions.startAt ? elementOptions.startAt < 0 : false
    })
  
    if (scrollY < 0 && !allowNegativeStart) {
      return 0
    }
  
    const value = (scrollY / this.containerRect.height) * 100
  
    if (value > 100) {
      return 100
    }
  
    return +value.toFixed(2)
  }
  
  /**
   * Initialize the animators instances
   * @private
   */
  private _initAnimators () {
    this._options.elements?.forEach((elementOptions) => {
      // Create an instance of the animator
      this.animate(elementOptions)
    })
  }
  
  /**
   * Initialize the debug element
   * @private
   */
  private _initDebugger () {
    if (!this._options.showDebug) {
      return
    }
    
    const existing = this._options.container.querySelector('#__debug_div')
    
    if (existing) {
      return
    }
    
    this._debugEl = document.createElement('div')
    this._debugEl.id = '__debug_div'
    this._debugEl.style.position = 'absolute'
    this._debugEl.style.top = '0'
    this._debugEl.style.bottom = '0'
    
    const stickyDiv = document.createElement('div')
    stickyDiv.style.position = 'sticky'
    stickyDiv.style.top = '0'
    
    this._debugEl.appendChild(stickyDiv)
    this._debugEl.stickyDiv = stickyDiv
    
    this.container.appendChild(this._debugEl)
    this.container.style.position = 'relative'
    
    this._updateDebugger()
  }
  
  /**
   * Function triggered on the scroll event
   * Method must be public to be used as a callback function in the scroll event inside WDSA
   */
  public onScroll () {
    // Update the target properties and position
    this._updateTargets()
    
    // Call the onScroll callback if any
    if (this._options.onScroll) {
      this._options.onScroll(this.scrollPercent)
    }
    
    // Update the debug element if any
    if (this._options.showDebug) {
      this._updateDebugger()
    }
  }
  
  /**
   * Update the targets properties based on the scroll percentage
   */
  private _updateTargets () {
    this._animators.forEach(animator => animator.update(this.scrollPercent))
  }
  
  /**
   * Update the debug element if any and its content
   */
  private _updateDebugger () {
    if (!this._debugEl) {
      return
    }
    
    const position = {
      top: this.containerOffset.top,
      bottom: this.containerOffset.top + this.containerOffset.height,
      boundTop: this.containerRect.top,
      boundBottom: this.containerRect.bottom
    }
    
    if (this._debugEl.stickyDiv) {
      this._debugEl.stickyDiv.innerHTML = `
          <p>Top: ${position.top}</p>
          <p>Bottom: ${position.bottom}</p>
          <p>Bound Top: ${position.boundTop}</p>
          <p>Bound Bottom: ${position.boundBottom}</p>
          <p>Percent: ${this.scrollPercent}</p>
          `
    }
  }
  
  /**
   * Allow to animate another element in the same container as the one used in the observer
   * @param elementOptions
   */
  public animate (elementOptions: WdsaAnimatorOptions) {
    if (!elementOptions.target) {
      console.error('You must provide a target element', elementOptions)
      return this
    }
  
    let existing
  
    if (elementOptions.target instanceof NodeList) {
      existing = [...elementOptions.target].find((target: any) => target[WdsaAnimator.libName])
    } else {
      // first check if the target has already an animator
      existing = elementOptions.target[WdsaAnimator.libName]
    }
  
    if (existing) {
      // merge the existing options with the new ones
      existing.updateOptions(elementOptions)
      existing.update(this.scrollPercent)
    } else {
      this._animators.push(new WdsaAnimator(elementOptions))
      this._animators[this._animators.length - 1].update(this.scrollPercent)
    }
  
    return this
  }
}
