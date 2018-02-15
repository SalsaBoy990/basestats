const $S = require('../main')
const saveToCSV = require('../src/export/save-csv')
const getJSONFromURL = require('../src/import/import-data')

let variables = [
  'min',
  'max',
  'sum',
  'amean', // arithmetic mean
  'Q1',
  'median',
  'Q3',
  'outliers',
  'variance',
  'stdev'
]

getJSONFromURL('http://jsonvat.com/', function (err, body) {
  if (err) throw err

  // to access the function methods through the prototype
  const self = getJSONFromURL.prototype

  let parsed = JSON.parse(body)
  parsed = self.subsetByProperty(parsed.rates, 'periods')

  // console.log(parsed[0][0].rates.standard)

  // get standard VAT values; there is a 2d array in the object!
  let vat = parsed.map(function (item) {
    return item[0].rates.standard
  })

  // get basic stats from VAT values
  let stats = $S.getBaseStats(variables, vat)

  // save results to a file
  saveToCSV('vat.csv', stats, ['Statistics', 'Value'], ';')
})
