import { generateUniqueId } from './utilities/idGenerator'

export class WdsaBasic<T = null> {
  // ID of the instance
  public id: string
  
  /**
   * The options of the animator
   * @private
   */
  protected _options: T
  
  /**
   * The default options of the animator
   * @private
   */
  protected _defaultOptions!: Partial<T>
  
  protected constructor (idPrefix: string, options?: T) {
    // generate a random id for this instance
    this.id = generateUniqueId(idPrefix)
    
    // merge the default options with the user options
    this._options = Object.assign({}, this._defaultOptions ?? {}, options ?? {}) as any
  }
  
}
