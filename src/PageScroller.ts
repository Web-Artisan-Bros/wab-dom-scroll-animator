import { PageScrollerObserver } from './PageScrollerObserver'
import { PageScrollerObserverOptions } from './Interfaces/PageScrollerObserverOptions'

export class PageScroller {
  private static _observers = []
  private static _libInstance
  private static _libName = '_pageScroller'
  
  constructor () {
    this.init()
  }
  
  init () {
    // listen to window scroll event
    window.addEventListener('scroll', this.onScroll.bind(this))
  }
  
  onScroll () {
    // call onScroll method of each observer
    PageScroller._observers.forEach((instance) => {
      instance.onScroll()
    })
  }
  
  /**
   * Register a new observer for a specific element
   * @param {PageScrollerObserverOptions} options
   */
  public static register (options: PageScrollerObserverOptions): PageScrollerObserver {
    // create a new instance of the library if it doesn't exist
    if (!this._libInstance) {
      this._libInstance = new PageScroller()
    }
  
    // I must group the observers by the container element
    // so that I can call the onScroll method only once for each container
    const container = options.container
    let instance
  
    if (container[this._libName]) {
      instance = this._observers.find((instance) => instance._id === container[this._libName]._id)
    
      options.elements.forEach((element) => {
        instance.animate(element)
      })
    } else {
      // create a new instance of the observer
      instance = new PageScrollerObserver(options)
    
      // add the instance to the list of observers
      this._observers.push(instance)
    
      container[this._libName] = instance
    }
  
    // return the created observer instance
    return instance
  }
  
}
