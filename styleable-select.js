const CONFIG = {
  containerClass: "styleable-select__container",
  valueClass: "styleable-select__value",
  listClass: "styleable-select__list",
  itemClass: "styleable-select__item",
  showClass: "styleable-select__list--show",
  selectedClass: "styleable-select__list--selected",
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

  val(value) {
    this.selectValue(value)
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
function _initElement(s) {
  //Adds classes to new elements
  s.element.classList.add(CONFIG.containerClass)
  s.element.tabIndex = 0

  s.label.classList.add(CONFIG.valueClass)
  s.label.innerText = s.selectedOption.label
  s.element.append(s.label)

  s.optionsElement.classList.add(CONFIG.listClass)

  //Adds optionsList to optionsElement
  s.optionsList.forEach(option => {
    const optionElement = document.createElement("li")
    optionElement.classList.add(CONFIG.itemClass)
    optionElement.classList.toggle(CONFIG.selectedClass, option.selected)

    optionElement.innerText = option.label
    optionElement.dataset.value = option.value

    optionElement.addEventListener("click", () => {
      s.selectValue(option.value)
      s.optionsElement.classList.remove(CONFIG.showClass)
    })
    s.optionsElement.append(optionElement)
  })
  s.element.append(s.optionsElement)

  s.label.addEventListener("click", () => {
    s.optionsElement.classList.toggle(CONFIG.showClass)
  })

  s.element.addEventListener("blur", () => {
    s.optionsElement.classList.remove(CONFIG.showClass)
  })

  //Keyboard support
  let term = ""
  let debounceTimeout
  s.element.addEventListener("keydown", e => {
    switch (e.code) {
      case "ArrowLeft":
      case "ArrowUp": { //Selects prev
        const prevOption = s.optionsList[s.selectedOptionIndex - 1]
        if (prevOption) {
          s.selectValue(prevOption.value)
        }
        break
      }
      case "ArrowRight":
      case "ArrowDown": {//Selects next
        const nextOption = s.optionsList[s.selectedOptionIndex + 1]
        if (nextOption) {
          s.selectValue(nextOption.value)
        }
        break
      }
      case "Space"://Show list
        s.optionsElement.classList.toggle(CONFIG.showClass)
        break
      case "Enter":
      case "Escape"://Hides list
        s.optionsElement.classList.remove(CONFIG.showClass)
        break

      default: {
        //clear and create timeout to cancel keystrokes
        clearTimeout(debounceTimeout)
        //Append key to last typed unless timeout is over, then empty term
        term += e.key
        debounceTimeout = setTimeout(() => {
          term = ""
        }, CONFIG.timeBetweenKeyStrokes)

        const searchedOption = s.optionsList.find(option => {
          //Function to find first item with search term
          return option.label.toLowerCase().startsWith(term)
        })
        if (searchedOption) {
          s.selectValue(searchedOption.value)
        }
      }
    }
  })


  //Adds aria support
  const id = s.select.id;
  s.select.setAttribute("aria-role", "listbox");
  if (id) {
    const labelElement = document.querySelector(`label[for='${id}']`)
    labelElement.setAttribute("aria-label", labelElement.innerText);
    labelElement.id = s.select.id + "Label";
    labelElement.addEventListener("click", (e) => {
      s.optionsElement.classList.toggle(CONFIG.showClass)
    })

    s.select.setAttribute("aria-labeledby", labelElement.id);
  }
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
