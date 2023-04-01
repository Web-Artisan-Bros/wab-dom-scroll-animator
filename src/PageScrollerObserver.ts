import { PageScrollerObserverOptions } from './Interfaces/PageScrollerObserverOptions'
import { Animator } from './Animator'

export class PageScrollerObserver {
  private _options: PageScrollerObserverOptions
  private _id
  private _debounceTimer
  private _debugEl
  private _animators = []
  
  constructor (options: PageScrollerObserverOptions) {
    this._options = Object.assign({
      debounceTime: 10
    }, options)
    
    // generate a random id for this instance
    this._id = Math.random().toString(36).slice(2, 9)
    
    // Create an instance of the animator
    this._animators.push(new Animator(this._options.scrollTarget, this._options.properties))
    
    this._initDebugger()
  }
  
  get viewHeight () {
    return this._options.container.offsetHeight
  }
  
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
  
  get scrollPercent () {
    let scrollY = (this._options.scrollRoot ? this._options.scrollRoot.scrollTop : window.scrollY)
      - this.containerOffset.top
    
    if (scrollY < 0) {
      return 0
    }
    
    const value = (scrollY / this.viewHeight) * 100
    
    if (value > 100) {
      return 100
    }
    
    return value
  }
  
  public onScroll () {
    this.debounce(this._options.delay ?? 10, () => {
      // Update the target properties
      this.updateTarget()
      
      // Call the onScroll callback if any
      if (this._options.onScroll) {
        this._options.onScroll(this.scrollPercent)
      }
      
      // Update the debug element if any
      if (this._options.showDebug) {
        this.updateDebug()
      }
    })
    
  }
  
  /**
   * Update the targets properties based on the scroll percentage
   */
  private updateTarget () {
    // must calculate the percentage considering startAt and endAt
    let percentage = this.scrollPercent
    
    // calculate the percentage of the final scroll range
    let subPercentage = 100 - (this._options.endAt || 0) - (this._options.startAt || 0)
    
    if (this._options.startAt) {
      percentage -= this._options.startAt
    }
    
    // if subPercentage is > 0, then recalculate the percentage
    if (subPercentage) {
      percentage = (percentage * 100) / subPercentage
    }
    
    // if percentage is > 100, then set it to 100
    if (percentage > 100) {
      percentage = 100
    }
    
    // if percentage is < 0, then set it to 0
    if (percentage < 0) {
      percentage = 0
    }
    
    // console.log(this.scrollPercent, percentage, subPercentage)
    
    this._animators.forEach(animator => animator.update(percentage))
  }
  
  private _initDebugger () {
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
    this.updateDebug()
    
    /* this._debugAnimator = new Animator(this._debugEl, {
       top: ['0', '100%'],
       translateY: ['0', '-100%'],
     })*/
    
  }
  
  private updateDebug () {
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
  
  private debounce (delay, fn) {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer)
    }
    
    this._debounceTimer = setTimeout(() => {
      fn()
    }, delay)
  }
  
  /*public append (options: Pick<PageScrollerObserverOptions, 'scrollTarget' | 'properties'>) {
    this._animators.push(new Animator(options.scrollTarget, options.properties))
  }*/
}
