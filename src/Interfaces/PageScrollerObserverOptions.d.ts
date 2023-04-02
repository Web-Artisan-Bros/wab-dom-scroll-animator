import { PageScrollerAnimatorOptions } from './PageScrollerAnimatorOptions'

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
