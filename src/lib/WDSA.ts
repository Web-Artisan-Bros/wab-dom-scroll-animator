import { WdsaObserver } from './WdsaObserver'
import { WdsaObserverOptions } from './Interfaces/WdsaObserverOptions'
import { generateLibName } from './utilities/libNameGenarator'
import { WdsaBasic } from './WdsaBasic'
import anime from 'animejs'
import { StaggerOptions } from 'animejs'

export class WDSA extends WdsaBasic {
  public static readonly libName = generateLibName('wdsa')
  private static _observers: WdsaObserver[] = []
  private static _libInstance: WDSA
  
  constructor () {
    super('wdsa')
    
    this._init()
  }
  
  private _init () {
    // listen to window scroll event
    window.addEventListener('scroll', this._onScroll.bind(this))
  }
  
  private _onScroll () {
    // call onScroll method of each observer
    WDSA._observers.forEach((instance) => {
      instance.onScroll()
    })
  }
  
  /**
   * Register a new observer for a specific element
   * @param {WdsaObserverOptions} options
   */
  public static register (options: WdsaObserverOptions): WdsaObserver {
    // create a new instance of the library if it doesn't exist
    if (!this._libInstance) {
      this._libInstance = new WDSA()
    }
    
    // I must group the observers by the container element
    // so that I can call the onScroll method only once for each container
    const container: HTMLElement & Record<string, any> = options.container
    
    let instance: WdsaObserver
    
    // check if the container already has an observer instance
    // if so, I will use that instance to add the new elements to animate
    if (container[this.libName]) {
      instance = this._observers.find((instance) => instance.id === container[this.libName].id) as WdsaObserver
      
      options.elements.forEach((element) => {
        instance.animate(element)
      })
    } else {
      // create a new instance of the observer
      instance = new WdsaObserver(options)
  
      // add the instance to the list of observers
      this._observers.push(instance)
  
      // save the instance in the container element
      container[this.libName] = instance
    }
  
    // return the created observer instance
    return instance
  }
  
  public static stagger (value: number | string | ReadonlyArray<number | string>, options?: StaggerOptions): (...args) => number {
    return anime.stagger(value, options)
  }
}
