const $S = require('../main')

$S.getJSONFromURL('http://jsonvat.com/', function (err, body) {
  if (err) throw err

  // to access the function methods through the prototype
  /* const self = getJSONFromURL.prototype */

  let parsed = JSON.parse(body)
  parsed = $S.subsetByProperty(parsed.rates, 'periods')

  // console.log(parsed[0][0].rates.standard)

  // get standard VAT values; there is a 2d array in the object!
  let vat = parsed.map(function (item) {
    return item[0].rates.standard
  })

  // get basic stats from VAT values
  let stats = $S.getBaseStats($S.vars, vat)

  // save results to a file
  $S.saveToCSV('./example/results/vat.csv', stats, ['Statistics', 'Value'], ';')
})
