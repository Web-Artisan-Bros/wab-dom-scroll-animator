import { PageScroller } from './PageScroller'

window.addEventListener('load', () => {
  PageScroller
    .register({
      scrollTarget: document.querySelector('header h1') as HTMLElement,
      container: document.querySelector('header') as HTMLElement,
      showDebug: true,
      endAt: 50,
      properties: {
        'top': ['0', '100%'],
        'translateX': ['0', '100%'],
        'translateY': ['0', '-100%']
      }
    })
  
  PageScroller.register({
    scrollTarget: document.querySelector('header .animate2') as HTMLElement,
    container: document.querySelector('header') as HTMLElement,
    showDebug: true,
    
    // startAt: 10,
    // endAt: 20,
    properties: {
      rotate: ['0deg', '360deg']
    }
  })
  
  // @ts-ignore
  window.PageScroller = PageScroller
})
