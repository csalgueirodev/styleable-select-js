# styleable-select-js
## Vanilla JS Styleable Select 
A simple vanilla JS module to change any select element to make it styleable without losing any functionality changing it to a `div > span` container and a `ul li` hidden list

## Basic usage:
### HTML
```HTML
<select class="styleable-select">
    <option value="">Select an item</option>
    ...
```

### JS
For all elements
```Javascript
import StyleableSelect from "./styleable-select.js"

const elements = document.querySelectorAll(".styleable-select")
elements.forEach(el => { 
  new StyleableSelect(el) 
})
```
For specific elements
```Javascript
import StyleableSelect from "./styleable-select.js"

const fieldName = "nameOfYourSelect"
const styleableSelect = new StyleableSelect(document.querySelector(`.styleable-select[name='${fieldName}']`))
```

Selecting value programatically
```Javascript
styleableSelect.val("valueOfYourSelect")
```

### Config object
Initial config can be changed by modifing this object at the beginning of `styleable-select.js` 
```Javascript
const CONFIG = {
  containerClass: "styleable-select__container",
  valueClass: "styleable-select__value",
  listClass: "styleable-select__list",
  itemClass: "styleable-select__item",
  showClass: "styleable-select__list--show",
  selectedClass: "styleable-select__list--selected",
  timeBetweenKeyStrokes: 300
}
```
