import { WdsaAnimatorProperty } from './WdsaAnimatorProperty'

export interface WdsaAnimatorOptions {
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

