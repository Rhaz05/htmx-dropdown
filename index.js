import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'
import {
  dropdown,
  row,
  addColumnDropdown,
  addColumnDetails,
} from './templates/dropdown.template.js'

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

const data = [
  {
    id: nanoid(5),
    name: 'Rizzing Big Gyats',
    author: 'Lenard',
    category: 'Romance',
    status: 'In Progress',
  },
  {
    id: nanoid(5),
    name: 'The Rizzler',
    author: 'Lenard',
    category: 'Romance',
    status: 'Completed',
  },
  {
    id: nanoid(5),
    name: 'Eyy Yooow',
    author: 'Kurt',
    category: 'Tragedy',
    status: 'In Progress',
  },
  { id: nanoid(5), name: 'Skibidi', author: 'Lenard', category: 'Sci-Fi', status: 'Completed' },
  { id: nanoid(5), name: 'I Want BBC', author: 'Kurt', category: 'Action', status: 'In Progress' },
  { id: nanoid(5), name: 'Ow Noo!!!', author: 'Kurt', category: 'Horror', status: 'In Progress' },
]

app.get('/dropdown', (req, res) => {
  try {
    const { identifier } = req.query
    const type = req.query.type || null
    if (!identifier) {
      res.send(
        dropdown({
          options: ['Action', 'Romance', 'Tragedy', 'Sci-Fi', 'Horror'],
          placeholder: 'Select a Default',
          refresh: type,
          name: 'Default',
        })
      )
      return
    }

    if (identifier === 'Category') {
      res.send(
        dropdown({
          options: ['All', 'Action', 'Romance', 'Tragedy', 'Sci-Fi', 'Horror'],
          placeholder: 'Select a Category',
          refresh: type,
          name: 'Category',
        })
      )
    }

    if (identifier === 'Author') {
      res.send(
        dropdown({
          options: ['All', 'Rhaz', 'Fuzan', 'Kurt', 'Lenard'],
          placeholder: 'Select an Author',
          refresh: type,
          name: 'Author',
        })
      )
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/filter', (req, res) => {
  try {
    const author = req.query.author || 'All'
    const category = req.query.category || 'All'

    const filteredData = data.filter((item) => {
      const isAuthorMatch = author === 'All' || item.author === author
      const isCategoryMatch = category === 'All' || item.category === category

      return isAuthorMatch && isCategoryMatch
    })

    let rows = filteredData
      .map(
        (item) => /*html*/ `
          <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.category}</td>
              <td>${item.author}</td>
              <td>${item.status}</td>
          </tr>`
      )
      .join('')

    if (rows.length === 0) {
      rows = /*html*/ `
          <tr>
              <td colspan="5" class="text-center">No Data Found</td>
          </tr>`
    }

    res.send(rows)
  } catch (error) {
    console.log(error)
  }
})

app.get('/load', (req, res) => {
  let rows = data
    .map(
      (item) => /*html*/ `
      <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${item.author}</td>
          <td>${item.status}</td>
      </tr>`
    )
    .join('')
  res.send(rows)
})

//#region Dynamic Dropdowns
app.get('/dynamic', (req, res) => {
  res.send(
    row({
      options: ['All', 'Action', 'Romance', 'Tragedy', 'Sci-Fi', 'Horror'],
      placeholder: 'Select a Category',
      refresh: 'true',
      label: 'Category',
    })
  )
})

app.get('/test-add-row', (req, res) => {
  req.query.category = req.query.category || 'All'
  const target = req.query.target

  let title = []

  const filteredData = data.filter((item) => {
    const isCategoryMatch = req.query.category === 'All' || item.category === req.query.category
    return isCategoryMatch
  })

  filteredData.forEach((item) => {
    title.push(item.name)
  })

  res.send(
    addColumnDropdown({
      options: title,
      placeholder: 'Select a Category',
      refresh: 'true',
      label: 'Title',
      target: target,
    })
  )
})

app.get('/test-add-row-details', (req, res) => {
  const title = req.query.title
  console.log(title)
  if (!title) {
    res.status(400).send('No Title Provided')
  }

  const details = data.filter((item) => {
    return item.name === title
  })

  const { name, author, category, status } = details[0]
  res.status(200).send(
    addColumnDetails({
      author,
      status,
    })
  )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
