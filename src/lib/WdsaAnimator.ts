import anime from 'animejs'
import { AnimeInstance } from 'animejs'
import { WdsaAnimatorOptions } from './Interfaces/WdsaAnimatorOptions'
import { debounce } from './utilities/debounce'
import { generateLibName } from './utilities/libNameGenarator'
import { WdsaBasic } from './WdsaBasic'

export class WdsaAnimator extends WdsaBasic<WdsaAnimatorOptions> {
  public static readonly libName = generateLibName('wdsa_animator')
  
  protected _defaultOptions: Pick<WdsaAnimatorOptions, 'debounceTime'> = {
    // 10ms is a good middle ground between performance and smoothness
    // For the quick animations, this value could be lowered to 5ms or 1ms
    debounceTime: 10
  }
  
  /**
   * The percentage of the animation that has been played
   */
  public playPercentage: number = 0
  
  /**
   * The anime.js instance
   * @private
   */
  private _animation!: AnimeInstance
  
  /**
   * The anime.js instance for the css variables, if any
   * @private
   */
  private _animationCssVariables?: AnimeInstance
  
  constructor (options: WdsaAnimatorOptions) {
    super('animator', options)
  
    if (this._options.target instanceof NodeList) {
      this._options.target.forEach((target: HTMLElement) => {
        target[WdsaAnimator.libName] = this
      })
    } else {
      this._options.target[WdsaAnimator.libName] = this
    }
  
    this._initAnimation(this._options)
  }
  
  /**
   * Initialize the anime.js instances
   * @param options
   * @private
   */
  private _initAnimation (options: WdsaAnimatorOptions) {
    const cssVariables: any = {}
    const defaultAnimeOptions = {
      duration: 100,
      autoplay: false,
      easing: 'linear'
    }
    
    Object.keys(options.properties).forEach((key: any) => {
      if (key.startsWith('--')) {
        // @ts-ignore
        cssVariables[key] = options.properties[key] as any
  
        // @ts-ignore
        delete options.properties[key]
      }
    })
  
    // destroy the previous animations if any
    // this is necessary when we update the options
    this.destroyAnimations()
  
    const mainAnimationOptions: any = {
      targets: options.target,
      ...defaultAnimeOptions,
      ...options.properties
    }
  
    if (options.delay) {
      mainAnimationOptions.delay = options.delay
    }
  
    // create and store an instance of anime.js
    this._animation = anime(mainAnimationOptions)
  
    // if there are css variables to animate, create an instance of anime.js for them
    // by animating a simple object
    if (Object.keys(cssVariables).length) {
      let targets = cssVariables
    
      if (options.target instanceof NodeList) {
        targets = [...options.target].map(el => ({ ...cssVariables }))
      }
    
      const cssAnimationOptions = {
        targets,
        ...cssVariables,
        ...defaultAnimeOptions,
        update: this.onCssVariablesUpdate.bind(this)
      }
    
      if (options.delay) {
        cssAnimationOptions.delay = options.delay
      }
    
      this._animationCssVariables = anime(cssAnimationOptions)
    }
  }
  
  /**
   * Method that updates the animation position based on the scroll percentage
   * This method must be public because it is called from the WdsaObserver#_updateTargets method
   * @param percentage
   */
  public update (percentage: number) {
    // debounce the update to avoid performance issues
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
  
      this.playPercentage = this._animation.duration ? ((this._animation.duration * percentage) / 100) : percentage
  
      this._animation.seek(this.playPercentage)
  
      if (this._animationCssVariables) {
        this._animationCssVariables.seek(this.playPercentage)
      }
    }, this._options.debounceTime ?? this._defaultOptions.debounceTime ?? 1, this.id)
  }
  
  /**
   * Method that is called when the anime.js instance for the css variables is updated
   * @param anim
   * @private
   */
  private onCssVariablesUpdate (anim: AnimeInstance) {
    anim.animations.forEach((animation, i) => {
      if (this._options.target instanceof NodeList) {
        const index = animation.animatable.id;
        
        (this._options.target[index] as HTMLElement)?.style.setProperty(animation.property, animation.currentValue)
      } else {
        this._options.target.style.setProperty(animation.property, animation.currentValue)
      }
    })
  }
  
  /**
   * Method that updates the options of the animation and re-initializes it
   * @param options
   */
  public updateOptions (options: WdsaAnimatorOptions) {
    this._options = Object.assign({}, this._options, options)
    
    // after updating the options, we need to re-init the animation
    this._initAnimation(this._options)
  }
  
  /**
   * Method that destroys the anime.js instances
   * @private
   */
  private destroyAnimations () {
    if (this._animation) {
      // @ts-ignore
      this._animation.remove(this._animation.animatables.map((animatable) => animatable.target))
    }
    
    if (this._animationCssVariables) {
      // @ts-ignore
      this._animationCssVariables.remove(this._animationCssVariables.animatables.map((animatable) => animatable.target))
    }
  }
}
