# basestats

**A Node.js module that calculates basic statistics from arrays, array-like objects, JSON and data from MongoDB etc.**

## Installation

    npm install basestats


## Usage

I recommend inspecting and running the scripts in the **Example** part. Especially the MongoDB part!

### Simple arrays and objects

```javascript
const $S = require('basestats')

let sample = [5, 13, 27, 6, 9, 13, 20, 2, 9, -100, 335]

let person = [
  {
    age: 44,
    height: 182 /* in cm */
  },
  {
    age: 32,
    height: 196
  },
  {
    age: 23,
    height: 169
  },
  {
    age: 55,
    height: 176
  },
  {
    age: 14,
    height: 155
  },
  {
    age: 200,
    height: 200
  }
]

// get percentile values from the array of numbers
let pcs = $S.getAllPercentiles(sample)
console.log('sample: ', pcs)

// save the percentile results to file
$S.saveToCSV('sample.csv', pcs, ['Percentile', 'Value'], ';')

// get basic stats from the array of numbers, save it
let arr = $S.getBaseStats($S.vars, sample)
$S.saveToCSV('arr.csv', arr, ['Statistics', 'Value'], ';')
console.log('arr: ', arr)

// calculate stats from the 'age' property of the 'person' object, save it
let age = $S.getBaseStats($S.vars, $S.subsetByProperty(person, 'age'))
$S.saveToCSV('age.csv', age, ['Statistics', 'Value'], ';')
console.log('person (age): ', age)

// log the stats from the 'height' property of the 'person' object
console.log('person (height): ', $S.getBaseStats($S.vars, $S.subsetByProperty(person, 'height')))
```

### JSON from URL

```javascript
const $S = require('basestats')

$S.getJSONFromURL('http://jsonvat.com/', function (err, body) {
  if (err) throw err

  let parsed = JSON.parse(body)
  parsed = $S.subsetByProperty(parsed.rates, 'periods')

  // get standard VAT values; there is a 2d array in the object!
  let vat = parsed.map(function (item) {
    return item[0].rates.standard
  })

  // get basic stats from VAT values
  let stats = $S.getBaseStats($S.vars, vat)

  // save results to a file
  $S.saveToCSV('vat.csv', stats, ['Statistics', 'Value'], ';')
})
```

### MongoDB

You need to have the the data in the Mongo database. See the **Example** part for detailed information!

```javascript
const mongoose = require('mongoose')

const $S = require('basestats')

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
  $S.saveToCSV('bookPageCount.csv', stats, ['Statistics', 'Value'], ';')
})
```


## Examples

Navigate to `node_modules\basestats` in your project folder, and run

    npm run example-simple
    npm run example-json

to calculate stats from simple arrays, objects, and JSON.

For the MongoDB example, follow these instructions:
1. Get JSON data from url, save it as a json file by running this script: `npm run db-sample`

2. After that you have to import this file to the mongo database. Run this command (in one line):
  `mongoimport -db basestats-demo --collection books --type json --file books.json`

3. And finally, run `npm run example-mongo`. Otherwise, this example won't work!

Note: I use the module called **mongoose** for the example. However, you need to have mongo installed on your computer. Just in case you are new to MongoDB:

### Install MongoDB on your computer

* [Download the installer](https://www.mongodb.org/dl/win32/x86_64-2008plus-ssl). I use this version on Windows 7: 

`mongodb-win32-x86_64-2008plus-ssl-3.2.9-signed.msi`

* Install it in a folder like this: `C:\mongodb`
* Create the following folders inside `C:\mongodb`: `data/db` and `log`
* Add `C:\mongodb\bin` to the PATH variable if needed, or go to the directory and run this command:

`mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongo.log --logappend --install`

* Run the service: `net start MongoDB`
* Run the shell application: `mongo`

### Check your input record in the Mongo database (from example)

* Start `mongo`
* `show dbs`
* `use basestats-demo`
* `show collections`
* `db.books.find({}, { _id: 1, title: 1, pageCount: 1 }).sort({ _id: 1 }).pretty()`


## Change log

20/02/2018: README errors and errors in the examples corrected

## Release Notes

* 1.0.2 Minor corrections
* 1.0.1 Module restructured
* 1.0.0 Initial release

## License

MIT &copy; 2017 András Gulácsi

Contact: guland@protonmail.com
