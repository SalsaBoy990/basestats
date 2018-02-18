const fs = require('fs')

// Save results to CSV
module.exports = function (filename, dataToSave, header, deliminator) {
  // If arguments are missing
  if (arguments.length < 4) { throw new Error('You did not supply all the arguments!') }

  // This array will be saved to file
  let save = []

  // The header contains the column names as an array: ['Percentile', 'Value']
  if (header) { save.push(header.join(deliminator)) }

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
