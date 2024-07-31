export const dropdown = ({ options, placeholder, name, type }) => {
  return /* html */ `
    <label for="${name}">Select ${name}</label>
    <div 
      class="dropdown-container"
      data-options='${JSON.stringify(options)}' 
      data-placeholder='${placeholder}'
      data-type="${type}"
      id="${name}"
      name="${name}"
    ></div>`
}
