import { PageScroller } from './PageScroller'

window.addEventListener('load', () => {
  PageScroller
    .register({
      container: document.querySelector('header') as HTMLElement,
      showDebug: true,
      elements: [
        {
          target: document.querySelector('header h1') as HTMLElement,
          endAt: 50,
          properties: {
            'top': ['0', '100%'],
            'translateX': ['0', '100%'],
            'translateY': ['0', '-100%']
          }
        }, {
          target: document.querySelector('header .animate2') as HTMLElement,
          endAt: 70,
          debounceTime: 1,
          properties: {
            rotate: ['0deg', '360deg']
          }
        }
      ]
    })
  
  PageScroller.register({
    container: document.querySelector('header') as HTMLElement,
    elements: [
      {
        target: document.querySelector('header .animate3') as HTMLElement,
        endAt: 50,
        properties: {
          rotate: ['0deg', '360deg']
        }
      }
    ]
  })
  
  PageScroller.register({
    container: document.querySelector('main') as HTMLElement,
    showDebug: true,
    elements: [
      {
        target: document.querySelector('main .animate2') as HTMLElement,
        endAt: 70,
        debounceTime: 1,
        properties: {
          'top': ['0', '500px']
        }
      }
    ]
  })
  
  PageScroller.register({
    container: document.querySelector('footer') as HTMLElement,
    showDebug: true,
    elements: [
      {
        target: document.querySelector('footer') as HTMLElement,
        endAt: 80,
        properties: {
          '--var1': ['0', '500px'],
          '--font-size': ['1rem', '2rem']
        }
      }
    ]
  })
    .animate({
      target: document.querySelector('footer h1') as HTMLElement,
      endAt: 80,
      properties: {
        '--var2': ['0', '500px'],
        'top': ['0', '500px']
      }
    })
    .animate({
      target: document.querySelector('footer h1') as HTMLElement,
      endAt: 90,
      properties: {
        '--var2': ['0', '500px'],
        'top': ['0', '500px']
      }
    })
  
  // @ts-ignore
  window.PageScroller = PageScroller
})
