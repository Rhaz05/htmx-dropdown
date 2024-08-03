import { getQueryParams } from './util/utility.js'
import { Dropdown } from './util/dropdown.util.js'

$(document).ready(function () {
  function updateTable() {
    const author = $('#authorDropdownContainer .dropdown-input').val()
    const category = $('#categoryDropdownContainer .dropdown-input').val()
    const url = `/filter?author=${encodeURIComponent(author)}&category=${encodeURIComponent(
      category
    )}`

    console.log(getQueryParams(url))

    htmx.ajax('GET', url, {
      target: '#tableContainer',
      swap: 'innerHTML',
    })
  }

  $('#authorDropdownContainer').on('change', '.dropdown-input', updateTable)
  $('#categoryDropdownContainer').on('change', '.dropdown-input', updateTable)

  // Re-initialize dropdowns if htmx swap occurs
  document.addEventListener('htmx:afterSwap', function (event) {
    if ($(event.target).find('[data-refresh="true"]').length > 0) {
      Dropdown()
    }
  })
})
