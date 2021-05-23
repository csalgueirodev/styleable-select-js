import StyleableSelect from "./styleable-select.js"

const elements = document.querySelectorAll(".styleable-select")
elements.forEach(el => { new StyleableSelect(el) })
