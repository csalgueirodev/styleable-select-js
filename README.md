# styleable-select-js
## Vanilla JS Styleable Select 
A simple vanilla JS module to change any select element to make it styleable without losing any functionality changing it to a `div > span` container and a `ul li` hidden list

### Basic usage:
#### HTML
```HTML
<select class="styleable-select">
    <option value="">Select an item</option>
    ...
```

#### JS
```Javascript
import StyleableSelect from "./styleable-select.js"

const elements = document.querySelectorAll(".styleable-select")
elements.forEach(el => { 
  new StyleableSelect(el) 
})
```

#### Config object
Initial config can be changed by modifing this object at the beginning of `styleable-select.js` 
```Javascript
const CONFIG = {
  containerClass: "styleable-select-container",
  valueClass: "styleable-select-value",
  listClass: "styleable-select-options",
  itemClass: "styleable-select-option",
  showClass: "show",
  selectedClass: "selected",
  timeBetweenKeyStrokes: 300
}
```
