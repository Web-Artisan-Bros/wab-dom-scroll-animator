import anime from 'animejs'
import { PageScrollerAnimatorOptions } from './Interfaces/PageScrollerObserverOptions'
import { generateUniqueId } from './utilities/idGenerator'
import { debounce } from './utilities/debounce'

export class PageScrollerAnimator {
  private animation
  public _id
  public _options: PageScrollerAnimatorOptions
  
  public _playPercentage = 0
  
  public static _libName = '_pageScrollerAnimator'
  
  private _defaultOptions = {
    debounceTime: 10
  }
  
  constructor (options: PageScrollerAnimatorOptions) {
    this._options = Object.assign({}, this._defaultOptions, options)
    
    // generate a random id for this instance
    this._id = generateUniqueId('animator')
    
    this._options.target[PageScrollerAnimator._libName] = this
    
    this.animation = anime({
      targets: options.target,
      ...options.properties,
      duration: 100,
      autoplay: false,
      easing: 'linear'
    })
  }
  
  update (percentage: number) {
    // debounce the scroll event to avoid performance issues
    debounce(() => {
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
      
      // console.log(this._id, percentage)
      
      this._playPercentage = percentage
      
      this.animation.seek(this._playPercentage)
    }, this._options.debounceTime || this._defaultOptions.debounceTime, this._id)
  }
  
  public updateOptions (options: PageScrollerAnimatorOptions) {
    this._options = Object.assign({}, this._options, options)
  }
}
