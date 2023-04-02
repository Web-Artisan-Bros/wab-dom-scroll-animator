export interface PageScrollerObserverOptions {
  // The element that scrolls. Usually the window or the body element
  scrollRoot?: HTMLElement,
  
  // Container element where the target is located. This is used to calculate the scroll percentage.
  container: HTMLElement,
  
  // callback function that is called when the scroll percentage changes
  onScroll?: (scrollPercent: number) => void
  
  // show debug element and information
  showDebug?: boolean
  
  elements: PageScrollerAnimatorOptions[]
}

export interface PageScrollerAnimatorOptions {
  // Target element to animate
  target: HTMLElement,
  
  properties: Record<keyof Partial<ObserverProperty>, [string | number, string | number]>,
  
  // delay in ms of the scroll refresh
  debounceTime?: number
  
  // percentage on when to start animation
  startAt?: number
  
  // percentage on when to end animation
  endAt?: number
}

export type ObserverProperty = {
  // css properties
  width: ObserverPropertyValue
  height: ObserverPropertyValue
  top: ObserverPropertyValue
  right: ObserverPropertyValue
  bottom: ObserverPropertyValue
  left: ObserverPropertyValue
  
  // transform properties
  rotateX: ObserverPropertyValue
  rotateY: ObserverPropertyValue
  rotateZ: ObserverPropertyValue
  scale: ObserverPropertyValue
  scaleX: ObserverPropertyValue
  scaleY: ObserverPropertyValue
  scaleZ: ObserverPropertyValue
  skew: ObserverPropertyValue
  skewX: ObserverPropertyValue
  skewY: ObserverPropertyValue
  perspective: ObserverPropertyValue
  translateX: ObserverPropertyValue
  translateY: ObserverPropertyValue
  translateZ: ObserverPropertyValue
  rotate: ObserverPropertyValue
}

export type ObserverPropertyValue = string | number | (
  /**
   *
   * @param el
   * @param i The index of the animated targeted element
   */
  (el: HTMLElement, i: number) => void)
