export type WdsaAnimatorProperty = {
  // css properties
  width: WdsaAnimatorProperty
  height: WdsaAnimatorProperty
  top: WdsaAnimatorProperty
  right: WdsaAnimatorProperty
  bottom: WdsaAnimatorProperty
  left: WdsaAnimatorProperty
  opacity: WdsaAnimatorProperty
  
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

export type WdsaAnimatorPropertyValue = string | number | ((el: HTMLElement, i: number) => void)
