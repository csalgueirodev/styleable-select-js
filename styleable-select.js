export default class StyleableSelect {
  constructor(element) {
    this.element = element
    this.optionsList = getOptionsList(element.querySelectorAll("option"))
    this.element = document.createElement("div")
    this.label = document.createElement("span")
    this.optionsElement = document.createElement("ul")
    initElement(this)
    
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

function initElement(select) {
  //Adds classes to new elements
  select.element.classList.add("styleable-select-container")
  select.element.tabIndex = 0

  select.label.classList.add("styleable-select-value")
  select.label.innerText = select.selectedOption.label
  select.element.append(select.label)

  select.optionsElement.classList.add("styleable-select-options")

  //Adds optionsList to optionsElement
  select.optionsList.forEach(option => {
    const optionElement = document.createElement("li")
    optionElement.classList.add("styleable-select-option")
    optionElement.classList.toggle("selected", option.selected)

    optionElement.innerText = option.label
    optionElement.dataset.value = option.value
    optionElement.addEventListener("click", () => {
      select.selectValue(option.value)
      select.optionsElement.classList.remove("show")
    })
    select.optionsElement.append(optionElement)
  })
  select.element.append(select.optionsElement)

  
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
