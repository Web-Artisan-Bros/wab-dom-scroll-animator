export type AnimatorProperty = {
  // css properties
  width: AnimatorProperty
  height: AnimatorProperty
  top: AnimatorProperty
  right: AnimatorProperty
  bottom: AnimatorProperty
  left: AnimatorProperty
  
  // transform properties
  rotateX: AnimatorProperty
  rotateY: AnimatorProperty
  rotateZ: AnimatorProperty
  scale: AnimatorProperty
  scaleX: AnimatorProperty
  scaleY: AnimatorProperty
  scaleZ: AnimatorProperty
  skew: AnimatorProperty
  skewX: AnimatorProperty
  skewY: AnimatorProperty
  perspective: AnimatorProperty
  translateX: AnimatorProperty
  translateY: AnimatorProperty
  translateZ: AnimatorProperty
  rotate: AnimatorProperty
  
}

export type AnimatorPropertyValue = string | number | ((el: HTMLElement, i: number) => void)
