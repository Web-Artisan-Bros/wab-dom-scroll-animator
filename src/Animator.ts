import anime from 'animejs'

export class Animator {
  private animation
  
  constructor (target, properties, duration?) {
    this.animation = anime({
      targets: target,
      ...properties,
      duration: duration || 1000,
      autoplay: false,
      easing: 'linear',
    })
  }
  
  update (percentage: number) {
    const time = this.animation.duration * (percentage / 100)
    
    this.animation.seek(time)
  }
}
