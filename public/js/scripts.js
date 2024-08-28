import { getQueryParams } from './util/utility.js'
import { Dropdown } from './util/dropdown.util.js'
import { AddBook } from './util/addBook.js'

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

  $(document).on('click', '#deleterow', function (e) {
    let $row = $(this).closest('tr')
    $row.remove()
  })

  $(document).on('click', '#addBook', function (e) {
    const title = $('#title').val()
    const author = $('#bookAuthor .dropdown-input').val()
    const category = $('#bookCategory .dropdown-input').val()
    const status = $('#bookStatus .dropdown-input').val()

    const url = `/add-book?author=${encodeURIComponent(author)}&category=${encodeURIComponent(
      category
    )}&status=${encodeURIComponent(status)}&title=${encodeURIComponent(title)}`

    console.log(getQueryParams(url))

    htmx.ajax('GET', url, {
      target: '#tableContainer',
      swap: 'beforeend',
    })
  })
})
  