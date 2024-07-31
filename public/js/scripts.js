$(document).ready(function () {
  function initializeDropdowns() {
    $('.dropdown-container').each(function () {
      const container = $(this)
      const placeholder = container.attr('data-placeholder')
      const input = $(
        `<input type="text" class="dropdown-input form-control" placeholder="${placeholder}">`
      )
      container.append(input)

      const optionsContainer = $('<div class="dropdown-options"></div>')
      container.append(optionsContainer)

      const options = JSON.parse(container.attr('data-options'))
      options.forEach((option) => {
        const optionDiv = $('<div class="dropdown-option"></div>').text(option)
        optionsContainer.append(optionDiv)
      })

      input.on('focus', function () {
        optionsContainer.show()
      })

      input.on('input', function () {
        const filter = input.val().toLowerCase()
        optionsContainer.children('.dropdown-option').each(function () {
          const option = $(this)
          if (option.text().toLowerCase().includes(filter)) {
            option.show()
          } else {
            option.hide()
          }
        })
      })

      input.on('blur', function () {
        setTimeout(function () {
          optionsContainer.hide()
        }, 200)
      })

      optionsContainer.on('mousedown', '.dropdown-option', function () {
        input.val($(this).text())
        optionsContainer.hide()
      })
    })
  }

  document.addEventListener('htmx:afterSwap', function (event) {
    if ($(event.target).find('[data-type="0"]').length > 0) {
      initializeDropdowns()
    }
  })
})
