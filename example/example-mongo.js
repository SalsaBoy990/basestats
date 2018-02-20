const mongoose = require('mongoose')

const $S = require('../main')

// Connect to the database, you need to add error handling...
mongoose.connect('mongodb://localhost/basestats-demo')

// create a schema for a subdocument that is an embedded object
let dateSchema = mongoose.Schema({ $date: 'Date' })

// Create a schema for the books data, this is the structure of the database
let bookSchema = mongoose.Schema({
  title: String,
  isbn: String,
  pageCount: Number,
  publishedDate: dateSchema, // you can embed schema into a schema
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: String,
  status: String,
  authors: [String],
  categories: [String]
})

// Create the model
let bookModel = mongoose.model('bookModel', bookSchema, 'books')

// Query all of the books, but return only the id, title, and pageCount properties
let query = bookModel.find({}, { _id: 1, title: 1, pageCount: 1 })
  .sort({ title: 'asc' }) // sort by the title

// Calculate stats from the number of pages property, and export it into CSV
query.exec(function (err, data) {
  if (err) throw err
  console.log(data)

  // We need an array to work with
  let pageCount = data.map(function (item) {
    return item['pageCount']
  })
  console.log(pageCount)

  // get basic stats for the number of pages
  let stats = $S.getBaseStats($S.vars, pageCount)

  // save results to a file
  $S.saveToCSV('./example/results/bookPageCount.csv', stats, ['Statistics', 'Value'], ';')
})
