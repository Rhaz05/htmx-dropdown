import express from 'express'
import morgan from 'morgan'
import { dropdown } from './templates/dropdown.template.js'

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/dropdown', (req, res) => {
  try {
    const { identifier } = req.query
    const type = req.query.type || null
    if (!identifier) {
      res.send(
        dropdown({
          options: ['Action', 'Romance', 'Tragedy', 'Sci-Fi', 'Horror'],
          placeholder: 'Select a Default',
          type: type,
          name: 'Default',
        })
      )
      return
    }

    if (identifier === 'Category') {
      res.send(
        dropdown({
          options: ['Action', 'Romance', 'Tragedy', 'Sci-Fi', 'Horror'],
          placeholder: 'Select a Category',
          type: type,
          name: 'Category',
        })
      )
    }

    if (identifier === 'Fruit') {
      res.send(
        dropdown({
          options: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
          placeholder: 'Select a Fruit',
          type: type,
          name: 'Fruit',
        })
      )
    }
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
