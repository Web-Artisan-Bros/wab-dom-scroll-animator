import WDSA from '../dist/index.js'

window.addEventListener('load', () => {
  WDSA
    .register({
      container: document.querySelector('header'),
      // showDebug: true,
      elements: [
        {
          target: document.querySelector('header h1'),
          endAt: 50,
          properties: {
            'top': ['0', '100%'],
            'translateX': ['0', '100%'],
            'translateY': ['0', '-100%']
          }
        }, {
          target: document.querySelector('header .animate2'),
          endAt: 70,
          debounceTime: 1,
          properties: {
            rotate: ['0deg', '360deg']
          }
        }
      ]
    })
  
  WDSA.register({
    container: document.querySelector('header'),
    elements: [
      {
        target: document.querySelector('header .animate3'),
        endAt: 50,
        properties: {
          rotate: ['0deg', '360deg']
        }
      }
    ]
  })
  
  WDSA.register({
    container: document.querySelector('main'),
    // showDebug: true,
    elements: [
      {
        target: document.querySelector('main .animate2'),
        endAt: 70,
        debounceTime: 1,
        properties: {
          'top': ['0', '500px']
        }
      }
    ]
  })
  
  WDSA.register({
    container: document.querySelector('footer'),
    // showDebug: true,
    elements: [
      {
        target: document.querySelector('footer'),
        endAt: 80,
        properties: {
          '--var1': ['0', '500px'],
          '--font-size': ['1rem', '2rem']
        }
      }
    ]
  })
    .animate({
      target: document.querySelector('footer h1'),
      endAt: 80,
      properties: {
        '--var2': ['0', '500px'],
        'top': ['0', '500px']
      }
    })
    .animate({
      target: document.querySelector('footer h1'),
      endAt: 70,
      debounceTime: 0,
      properties: {
        '--var1': ['100px', '500px'],
        'top': ['0', '500px']
      }
    })
  
  // @ts-ignore
  window.WDSA = WDSA
})
