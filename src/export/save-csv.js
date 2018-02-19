const fs = require('fs')

module.exports = saveToCSV

// Save results to CSV (.txt, or other file)
// Args:
// filename: the name of the file and/or the file path
// dataToSave: object, key-value pairs with the statistical results
// header: array of strings, add a header to the two column (key-value) like this ['Statistics', 'Value']
// deliminator: string, any character you want
function saveToCSV (filename, dataToSave, header, deliminator) {
  // If arguments are missing
  if (arguments.length < 4) { throw new Error('You did not supply all the arguments!') }

  // This array will be saved to file
  let save = []
  save.push(header.join(deliminator))

  // Get the object keys to iterate
  let keys = Object.keys(dataToSave)
  let max = keys.length
  let str

  // Push data as string line by line
  for (let i = 0; i < max; i++) {
    str = keys[i]
    save.push(`${str}${deliminator}${dataToSave[str]}`)
  }

  // Save result in .csv
  fs.writeFile(filename, save.join('\n'), 'utf-8', (err) => {
    if (err) throw err
    console.log('Data successfully saved as ' + filename + '.')
  })
}
