# WAB Dom Scroll Animator

<img src="./assets/wdsa.jpg" alt="wab dom scroll animator hero">

This library allows to react to scroll events and animate DOM elements based on the scroll position.

One of the key features is that the animation is not based on the scroll position of the entire page, but on the scroll
position of a specific container. This allows to have multiple animations on the same page, each one reacting to the
scroll position of a different container.

## Installation

```bash
npm install --save wab-dom-scroll-animator
```

## Usage

```javascript
// ES6 module
import WDSA from 'wab-dom-scroll-animator'

// CommonJS
const WDSA = require('wab-dom-scroll-animator')

// Register a container to observe 
// and define the elements to animate
WDSA.register({
  container: document.querySelector('main'),
  // showDebug: true,
  elements: [{
    target: document.querySelector('main .my-element'),
    properties: {
      opacity: [0, 1]
    }
  }, {
    target: document.querySelector('header .alert-secondary'),
    properties: {
      opacity: [0, 1],
      translateX: ['-100px', 0]
    },
    startAt: 5,
    endAt: 80
  }]
})
```

## Methods
- `register(options)` - Register a container to observe and define the elements to animate
  - **options** - Object
    - `container` - DOM element to observe
    - `showDebug = false` - Boolean (optional) - Show debug information
    - `elements` - Array of objects
      - `target` - DOM element to animate | NodeList of DOM elements to animate
      - `properties` - Object with the properties to animate. See all available properties below
      - `startAt` - Number (optional) - Start animation at this percentage of the container height, from the TOP
      - `endAt` - Number (optional) - End animation at this percentage of the container height, from the BOTTOM
      - `debounceTime` - Number (optional) - Debounce time in milliseconds
      - `delay` - fn() => Number (optional) - Delay in milliseconds - Used for staggering elements
  - **returns** `WDSA` instance 

## Properties
These are all properties that can be animated. The value is an array with the start and end value of the animation.

```typescript
type WdsaAnimatorProperty = {
  
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
```

**Example**
    
```javascript
// animate width and height
properties: {
  width: ['0px', '100px'],
  height: ['0px', '100px']
}
```

## Contributing
Feel free to contribute to this project by opening issues or pull requests.
