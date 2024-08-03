export const Dropdown = () => {
  console.log('initializing dropdowns')

  $('.dropdown-container').each(function () {
    const container = $(this)

    if (container.find('.dropdown-input').length > 0) {
      return
    }

    const placeholder = container.attr('data-placeholder')
    const input = $(
      `<input type="text" class="dropdown-input form-control" placeholder="${placeholder}">`
    )
    const endPoint = container.attr('data-end-point')

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
      input.trigger('change')

      if (endPoint !== 'null') {
        let url = `${endPoint}${encodeURIComponent(input.val())}`
        const target = container.attr('data-target')
        const swap = container.attr('data-swap')
        if (target) {
          htmx.ajax('GET', url, {
            target: target,
            swap: swap ? swap : 'innerHTML',
          })
        } else {
          console.error('Invalid target selector')
        }
        input.prop('disabled', true)
      }
    })
  })
}
