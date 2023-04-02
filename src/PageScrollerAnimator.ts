import anime, { Animation, AnimeInstance } from 'animejs'
import { PageScrollerAnimatorOptions } from './Interfaces/PageScrollerAnimatorOptions'
import { generateUniqueId } from './utilities/idGenerator'
import { debounce } from './utilities/debounce'

export class PageScrollerAnimator {
  private animation
  private animationCssVariables
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
    
    this.initAnimation(this._options)
  }
  
  private initAnimation (options: PageScrollerAnimatorOptions) {
    const cssVariables = {}
    
    Object.keys(options.properties).forEach((key) => {
      if (key.startsWith('--')) {
        cssVariables[key] = options.properties[key]
        delete options.properties[key]
      }
    })
    
    console.log(cssVariables)
    
    this.animation = anime({
      targets: options.target,
      ...options.properties,
      duration: 100,
      autoplay: false,
      easing: 'linear'
    })
    
    if (Object.keys(cssVariables).length) {
      this.animationCssVariables = anime({
        targets: cssVariables,
        ...cssVariables,
        duration: 100,
        autoplay: false,
        easing: 'linear',
        update: this.onCssVariablesUpdate.bind(this)
      })
    }
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
  
      if (this.animationCssVariables) {
        this.animationCssVariables.seek(this._playPercentage)
      }
    }, this._options.debounceTime || this._defaultOptions.debounceTime, this._id)
  }
  
  private onCssVariablesUpdate (anim: AnimeInstance) {
    anim.animations.forEach((animation) => {
      this._options.target.style.setProperty(animation.property, animation.currentValue)
    })
  }
  
  public updateOptions (options: PageScrollerAnimatorOptions) {
    this._options = Object.assign({}, this._options, options)
  }
}
