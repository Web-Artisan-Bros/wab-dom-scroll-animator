type WdsaAnimatorProperty = {
  // css properties
  width: WdsaAnimatorProperty
  height: WdsaAnimatorProperty
  top: WdsaAnimatorProperty
  right: WdsaAnimatorProperty
  bottom: WdsaAnimatorProperty
  left: WdsaAnimatorProperty
  
  // transform properties
  rotateX: WdsaAnimatorProperty
  rotateY: WdsaAnimatorProperty
  rotateZ: WdsaAnimatorProperty
  scale: WdsaAnimatorProperty
  scaleX: WdsaAnimatorProperty
  scaleY: WdsaAnimatorProperty
  scaleZ: WdsaAnimatorProperty
  skew: WdsaAnimatorProperty
  skewX: WdsaAnimatorProperty
  skewY: WdsaAnimatorProperty
  perspective: WdsaAnimatorProperty
  translateX: WdsaAnimatorProperty
  translateY: WdsaAnimatorProperty
  translateZ: WdsaAnimatorProperty
  rotate: WdsaAnimatorProperty
  
}

interface WdsaAnimatorOptions {
  // Target element to animate
  
  target: HTMLElement & Record<string, any>,
  
  properties: Record<(keyof Partial<WdsaAnimatorProperty>), [string | number, string | number]> | Record<string, [string | number, string | number]>,
  
  // delay in ms of the scroll refresh
  debounceTime?: number
  
  // percentage on when to start animation
  startAt?: number
  
  // percentage on when to end animation
  endAt?: number
}

interface WdsaObserverOptions {
  // The element that scrolls. Usually the window or the body element
  scrollRoot?: HTMLElement | Window
  
  // Container element where the target is located. This is used to calculate the scroll percentage.
  container: HTMLElement,
  
  // callback function that is called when the scroll percentage changes
  onScroll?: (scrollPercent: number) => void
  
  // show debug element and information
  showDebug?: boolean
  
  elements: WdsaAnimatorOptions[]
}

declare class WdsaBasic<T = null> {
    id: string;
    /**
     * The options of the animator
     * @private
     */
    protected _options: T;
    /**
     * The default options of the animator
     * @private
     */
    protected _defaultOptions: Partial<T>;
    protected constructor(idPrefix: string, options?: T);
}

declare class WdsaObserver extends WdsaBasic<WdsaObserverOptions> {
    static readonly libName: string;
    protected _defaultOptions: Partial<WdsaObserverOptions>;
    /**
     * HTMLElement used to show the debug information
     * @private
     */
    private _debugEl;
    /**
     * List of animators instances
     * @private
     */
    private _animators;
    constructor(options: WdsaObserverOptions);
    /**
     * Return the offsetHeight of the container
     */
    get viewHeight(): number;
    /**
     * Return the container element
     */
    get container(): HTMLElement;
    /**
     * Get the position of the container relative to the viewport
     * @returns {{top: number, bottom: number, height: number, width: number}}
     */
    get containerRect(): DOMRect;
    /**
     * Get the position of the container relative to the page
     * @returns {{top: number, bottom: number, height: number, width: number}}
     */
    get containerOffset(): {
        top: number;
        bottom: number;
        height: number;
        width: number;
    };
    get scrollRootY(): number;
    /**
     * Return the scroll percentage based on the percentage of the container that is visible
     */
    get scrollPercent(): number;
    /**
     * Initialize the animators instances
     * @private
     */
    private _initAnimators;
    /**
     * Initialize the debug element
     * @private
     */
    private _initDebugger;
    /**
     * Function triggered on the scroll event
     * Method must be public to be used as a callback function in the scroll event inside WDSA
     */
    onScroll(): void;
    /**
     * Update the targets properties based on the scroll percentage
     */
    private _updateTargets;
    /**
     * Update the debug element if any and its content
     */
    private _updateDebugger;
    /**
     * Allow to animate another element in the same container as the one used in the observer
     * @param elementOptions
     */
    animate(elementOptions: WdsaAnimatorOptions): this;
}

declare class WDSA extends WdsaBasic {
    static readonly libName: string;
    private static _observers;
    private static _libInstance;
    constructor();
    private _init;
    private _onScroll;
    /**
     * Register a new observer for a specific element
     * @param {WdsaObserverOptions} options
     */
    static register(options: WdsaObserverOptions): WdsaObserver;
}

export { WDSA as default };
