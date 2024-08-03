import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'

export const dropdown = ({ options, placeholder, name, refresh }) => {
  return /* html */ `
    <label for="${name}">Select ${name}</label>
    <div 
      class="dropdown-container"
      data-options='${JSON.stringify(options)}' 
      data-placeholder='${placeholder}'
      data-refresh="${refresh}"
      data-end-point="null"
      id="${name}"
      name="${name}"
    ></div>`
}

export const row = ({ options, placeholder, label, refresh }) => {
  const target = `td-${nanoid(5)}`
  const mainTarget = `tr-${nanoid(5)}`
  const endPoint = `/test-add-row?target=${mainTarget}&category=`
  return /* html */ `
    <tr id="${mainTarget}">
        <td>
          <div 
            class="dropdown-container"
            data-options='${JSON.stringify(options)}' 
            data-placeholder='${placeholder}'
            data-refresh="${refresh}"
            data-end-point="${endPoint}"
            data-target="#${target}"
            id="${label}"
            name="${label}"
          ></div>
        </td>
        <td id="${target}">Select a Category to display Options</td>
    </tr>`
}

export const addColumnDropdown = ({ options, placeholder, label, refresh, target }) => {
  return /* html */ `
    <div 
      class="dropdown-container"
      data-options='${JSON.stringify(options)}' 
      data-placeholder='${placeholder}'
      data-refresh="${refresh}"
      data-end-point="/test-add-row-details?title="
      data-target="#${target}"
      data-swap="beforeend"
      id="${label}"
      name="${label}"
    ></div>`
}
export const addColumnDetails = ({ author, status }) => {
  const target = `td-${nanoid(5)}`
  const mainTarget = `tr-${nanoid(5)}`
  const endPoint = `/test-add-row?target=${mainTarget}&category=`
  return /* html */ `
    <td class="align-middle">
      ${author}
    </td>
    <td class="align-middle">
      ${status}
    </td>
    <td class="align-middle">
      <button class="btn btn-outline-danger">Delete</button>
    </td>
    `
}
