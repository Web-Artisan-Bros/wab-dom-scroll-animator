export interface PageScrollerObserverOptions {
  scrollRoot?: HTMLElement,
  scrollTarget: HTMLElement,
  container: HTMLElement,
  properties: Record<keyof Partial<ObserverProperty>, [string | number, string | number]>,
  onScroll?: (scrollPercent: number) => void
  showDebug?: boolean
  debounceTime?: number
  
  // percentage on when to start animation
  startAt?: number
  
  // percentage on when to end animation
  endAt?: number
  // delay in ms of the scroll refresh
  delay?: number
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
