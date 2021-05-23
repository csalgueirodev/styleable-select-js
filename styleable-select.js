export default class StyleableSelect {
  constructor(select) {
    this.select = select
    this.optionsList = getOptionsList(select.querySelectorAll("option"))
    this.element = document.createElement("div")
    this.label = document.createElement("span")
    this.optionsElement = document.createElement("ul")
    _initElement(this)
    
    //Hide select and add custom styleable element to the DOM
    select.style.display = "none"
    select.after(this.element)
  }

  get selectedOption() {
    return this.optionsList.find(option => option.selected)
  }

  get selectedOptionIndex() {
    return this.optionsList.indexOf(this.selectedOption)
  }

  selectValue(value) {
    const selectedOption = this.optionsList.find(option => {
      return option.value === value
    })
    //Get selected option and remove class selected
    const prevSelectedOption = this.selectedOption
    prevSelectedOption.selected = false
    prevSelectedOption.element.selected = false
    this.optionsElement.querySelector(`[data-value="${prevSelectedOption.value}"]`).classList.remove("selected")

    selectedOption.selected = true
    selectedOption.element.selected = true

    //Add value and class selected to selected option
    this.label.innerText = selectedOption.label
    const newelement = this.optionsElement.querySelector(`[data-value="${selectedOption.value}"]`)
    newelement.classList.add("selected")

    //scroll of the box always centered
    newelement.scrollIntoView({ block: "nearest" })
  } 
}

/**
 * _initElement
 * @param select Instance of StyleableSelect
 * private method to init elements
 */
function _initElement(select) {
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

  select.label.addEventListener("click", () => {
    select.optionsElement.classList.toggle("show")
  })

  select.element.addEventListener("blur", () => {
    select.optionsElement.classList.remove("show")
  })

  //Keyboard support
  select.element.addEventListener("keydown", e => {
    switch (e.code) {
      case "Space"://Show list
        select.optionsElement.classList.toggle("show")
        break
      case "ArrowUp": { //Selects prev
        const prevOption = select.optionsList[select.selectedOptionIndex - 1]
        if (prevOption) {
          select.selectValue(prevOption.value)
        }
        break
      }
      case "ArrowDown": {//Selects next
        const nextOption = select.optionsList[select.selectedOptionIndex + 1]
        if (nextOption) {
          select.selectValue(nextOption.value)
        }
        break
      }
      case "Enter":
      case "Escape"://Hides list
        select.optionsElement.classList.remove("show")
        break
      
    }
  })
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
