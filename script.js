import StyleableSelect from "./styleable-select.js"

const numbersSelect = new StyleableSelect(document.querySelector(".styleable-select[name='numbers']"))
const browsersSelect = new StyleableSelect(document.querySelector(".styleable-select[name='browsers']"))

browsersSelect.val("Firefox")
