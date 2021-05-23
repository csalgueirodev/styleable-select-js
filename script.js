import StyleableSelect from "./styleable-select.js"

const numbersSelect = new StyleableSelect(document.querySelector(".styleable-select[name='numbers']"))

const fieldName = "browsers"
const styleableSelect = new StyleableSelect(document.querySelector(`.styleable-select[name='${fieldName}']`))

browsersSelect.val("Firefox")
