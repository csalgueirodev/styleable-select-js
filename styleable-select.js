export default class StyleableSelect {
  constructor(element) {
    this.element = element
    this.optionsList = getOptionsList(element.querySelectorAll("option"))
    this.element = document.createElement("div")
    this.label = document.createElement("span")
    this.optionsCustomElement = document.createElement("ul")
    //initElement(this)
    
    //Hide select and add custom styleable element to the DOM
    element.style.display = "none"
    element.after(this.element)
  }

  get selectedOption() {
    return this.optionsList.find(option => option.selected)
  }

  get selectedOptionIndex() {
    return this.optionsList.indexOf(this.selectedOption)
  }

}


function getOptionsList(optionElements) {
  //Convert to array and map into array object
  return [...optionElements].map(optionElement => {
    return {
      value: optionElement.value,
      label: optionElement.label,
      selected: optionElement.selected,
      element: optionElement,
    }
  })
}
