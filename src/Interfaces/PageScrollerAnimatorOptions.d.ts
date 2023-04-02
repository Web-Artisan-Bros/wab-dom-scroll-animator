import { AnimatorProperty, AnimatorPropertyValue } from './AnimatorProperty'

export interface PageScrollerAnimatorOptions {
  // Target element to animate

  target: HTMLElement,
  
  
  properties: Record<(keyof Partial<AnimatorProperty>), [string | number, string | number]> | Record<string, [string | number, string | number]>,
  
  // delay in ms of the scroll refresh
  debounceTime?: number
  
  // percentage on when to start animation
  startAt?: number
  
  // percentage on when to end animation
  endAt?: number
}

