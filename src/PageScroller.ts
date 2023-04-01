import { PageScrollerObserver } from './PageScrollerObserver'
import { PageScrollerObserverOptions } from './Interfaces/PageScrollerObserverOptions'

export class PageScroller {
  private static _observers = []
  private static _libInstance
  
  constructor () {
    this.init()
  }
  
  init () {
    window.addEventListener('scroll', this.onScroll.bind(this))
  }
  
  onScroll () {
    PageScroller._observers.forEach((instance) => {
      instance.onScroll()
    })
  }
  
  public static register (options: PageScrollerObserverOptions): PageScrollerObserver {
    if (!this._libInstance) {
      this._libInstance = new PageScroller()
    }
    
    const instance = new PageScrollerObserver(options)
    
    this._observers.push(instance)
    
    return instance
  }
  
}
