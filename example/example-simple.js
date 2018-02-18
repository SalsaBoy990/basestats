const $S = require('../main')

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
$S.saveToCSV('./results/sample.csv', pcs, ['Percentile', 'Value'], ';')

// get basic stats from the array of numbers, save it
let arr = $S.getBaseStats($S.vars, sample)
$S.saveToCSV('./results/arr.csv', arr, ['Statistics', 'Value'], ';')
console.log('arr: ', arr)

// calculate stats from the 'age' property of the 'person' object, save it
let age = $S.getBaseStats($S.vars, $S.subsetByProperty(person, 'age'))
$S.saveToCSV('./results/age.csv', age, ['Statistics', 'Value'], ';')
console.log('person (age): ', age)

// log the stats from the 'height' property of the 'person' object
console.log('person (height): ', $S.getBaseStats($S.vars, $S.subsetByProperty(person, 'height')))
