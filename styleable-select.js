const CONFIG = {
  containerClass: "styleable-select-container",
  valueClass: "styleable-select-value",
  listClass: "styleable-select-options",
  itemClass: "styleable-select-option",
  showClass: "show",
  selectedClass: "selected",
  timeBetweenKeyStrokes: 300
}

export default class StyleableSelect {
  constructor(select) {
    this.select = select
    this.optionsList = _getOptionsList(select.querySelectorAll("option"))
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
    this.optionsElement.querySelector(`[data-value="${prevSelectedOption.value}"]`).classList.remove(CONFIG.selectedClass)

    selectedOption.selected = true
    selectedOption.element.selected = true

    //Add value and class selected to selected option
    this.label.innerText = selectedOption.label
    const newelement = this.optionsElement.querySelector(`[data-value="${selectedOption.value}"]`)
    newelement.classList.add(CONFIG.selectedClass)

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
  select.element.classList.add(CONFIG.containerClass)
  select.element.tabIndex = 0

  select.label.classList.add(CONFIG.valueClass)
  select.label.innerText = select.selectedOption.label
  select.element.append(select.label)

  select.optionsElement.classList.add(CONFIG.listClass)

  //Adds optionsList to optionsElement
  select.optionsList.forEach(option => {
    const optionElement = document.createElement("li")
    optionElement.classList.add(CONFIG.itemClass)
    optionElement.classList.toggle(CONFIG.selectedClass, option.selected)

    optionElement.innerText = option.label
    optionElement.dataset.value = option.value

    optionElement.addEventListener("click", () => {
      select.selectValue(option.value)
      select.optionsElement.classList.remove(CONFIG.showClass)
    })
    select.optionsElement.append(optionElement)
  })
  select.element.append(select.optionsElement)

  select.label.addEventListener("click", () => {
    select.optionsElement.classList.toggle(CONFIG.showClass)
  })

  select.element.addEventListener("blur", () => {
    select.optionsElement.classList.remove(CONFIG.showClass)
  })

  //Keyboard support
  let term = ""
  let debounceTimeout
  select.element.addEventListener("keydown", e => {
    switch (e.code) {
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
      case "Space"://Show list
        select.optionsElement.classList.toggle(CONFIG.showClass)
        break
      case "Enter":
      case "Escape"://Hides list
        select.optionsElement.classList.remove(CONFIG.showClass)
        break

      default: {
        //clear and create timeout to cancel keystrokes
        clearTimeout(debounceTimeout)
        //Append key to last typed unless timeout is over, then empty term
        term += e.key
        debounceTimeout = setTimeout(() => {
          term = ""
        }, CONFIG.timeBetweenKeyStrokes)

        const searchedOption = select.optionsList.find(option => {
          //Function to find first item with search term
          return option.label.toLowerCase().startsWith(term)
        })
        if (searchedOption) {
          select.selectValue(searchedOption.value)
        }
      }
    }
  })
}

/**
 * Method to map an array with the options of the select
 * @param {*} optionElements 
 * @returns array with the desired from each option
 */
function _getOptionsList(optionElements) {
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
