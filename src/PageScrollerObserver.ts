import { PageScrollerAnimatorOptions, PageScrollerObserverOptions } from './Interfaces/PageScrollerObserverOptions'
import { PageScrollerAnimator } from './PageScrollerAnimator'
import { generateUniqueId } from './utilities/idGenerator'
import { debounce } from './utilities/debounce'

export class PageScrollerObserver {
  private _defaultOptions = {
    scrollRoot: window
  }
  
  private _options: PageScrollerObserverOptions
  
  // Internal id for this instance
  public _id
  
  // HTMLElement used to show the debug information
  private _debugEl
  
  // List of animators instances
  private _animators = []
  
  constructor (options: PageScrollerObserverOptions) {
    // merge the default options with the provided ones
    this._options = Object.assign({}, this._defaultOptions, options)
    
    // generate a random id for this instance
    this._id = generateUniqueId('observer')
    
    this.initAnimators()
    this.initDebugger()
  }
  
  /**
   * Return the offsetHeight of the container
   */
  get viewHeight () {
    return this._options.container.offsetHeight
  }
  
  /**
   * Return the container element
   */
  get container () {
    return this._options.container
  }
  
  /**
   * Get the position of the container relative to the viewport
   * @returns {{top: number, bottom: number, height: number, width: number}}
   */
  get containerRect () {
    return this._options.container.getBoundingClientRect()
  }
  
  /**
   * Get the position of the container relative to the page
   * @returns {{top: number, bottom: number, height: number, width: number}}
   */
  get containerOffset () {
    return {
      top: this._options.container.offsetTop,
      bottom: this._options.container.offsetTop + this._options.container.offsetHeight,
      height: this._options.container.offsetHeight,
      width: this._options.container.offsetWidth
    }
  }
  
  get scrollRootY () {
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
  get scrollPercent () {
    let scrollY = this.scrollRootY - this.containerOffset.top
    
    if (scrollY < 0) {
      return 0
    }
    
    const value = (scrollY / this.viewHeight) * 100
    
    if (value > 100) {
      return 100
    }
    
    return +value.toFixed(2)
  }
  
  private initAnimators () {
    this._options.elements.forEach((elementOptions) => {
      // Create an instance of the animator
      this.animate(elementOptions)
    })
  }
  
  private initDebugger () {
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
    
    this.updateDebugger()
  }
  
  /**
   * Function triggered on the scroll event
   */
  public onScroll () {
    // Update the target properties and position
    this.updateTargets()
  
    // Call the onScroll callback if any
    if (this._options.onScroll) {
      this._options.onScroll(this.scrollPercent)
    }
  
    // Update the debug element if any
    if (this._options.showDebug) {
      this.updateDebugger()
    }
  }
  
  /**
   * Update the targets properties based on the scroll percentage
   */
  private updateTargets () {
    this._animators.forEach(animator => animator.update(this.scrollPercent))
  }
  
  /**
   * Update the debug element if any and its content
   */
  private updateDebugger () {
    if (!this._debugEl) {
      return
    }
    
    const position = {
      top: this.containerOffset.top,
      bottom: this.containerOffset.top + this.containerOffset.height,
      boundTop: this.containerRect.top,
      boundBottom: this.containerRect.bottom
    }
  
    this._debugEl.stickyDiv.innerHTML = `
          <p>Top: ${position.top}</p>
          <p>Bottom: ${position.bottom}</p>
          <p>Bound Top: ${position.boundTop}</p>
          <p>Bound Bottom: ${position.boundBottom}</p>
          <p>Percent: ${this.scrollPercent}</p>
          `
  }
  
  public animate (elementOptions: PageScrollerAnimatorOptions) {
    console.log('animate', elementOptions.target)
    if (!elementOptions.target) {
      console.error('You must provide a target element', elementOptions)
      return
    }
    
    // first check if the target has already an animator
    const existing = elementOptions.target[PageScrollerAnimator._libName]
    
    if (existing) {
      // merge the existing options with the new ones
      existing.updateOptions(elementOptions)
    } else {
      this._animators.push(new PageScrollerAnimator(elementOptions))
    }
  }
}
