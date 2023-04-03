import { WdsaAnimatorOptions } from './WdsaAnimatorOptions'

export interface WdsaObserverOptions {
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
