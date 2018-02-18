// READ THESE COMMENTS FIRST!
// 1. Get JSON data from url, save it as a json file by running this script
// 2. After that you have to import this file to the mongo database. Run this command:
  // mongoimport -db basestats-demo --collection books --type json --file books.json
// 3. And finally, run test-mongo.js with Node. Otherwise, the example won't work.

const fs = require('fs')
const $S = require('../main')

let url = 'https://raw.githubusercontent.com/ozlerhakan/mongodb-json-files/master/datasets/catalog.books.json'

$S.getJSONFromURL(url, function (err, body) {
  if (err) throw err

  let parsed = JSON.parse(body)
  console.log(parsed)

  // Save data to file
  let filename = 'books.json'
  fs.writeFile(filename, parsed, 'utf-8', (err) => {
    if (err) throw err
    console.log('Data successfully saved as ' + filename + '!')
  })
})
