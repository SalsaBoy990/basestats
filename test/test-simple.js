const $S = require('../main')
const saveToCSV = require('../src/export/save-csv')

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

let sample = [5, 13, 27, 6, 9, 13, 20, 2, 9, -100, 335]

var person = [
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
    age: 200, // I needed an outlier :lol
    height: 200
  }
]

let pcs = $S.getAllPercentiles(sample)
console.log('sample: ', pcs)

saveToCSV('./results/sample.csv', pcs, ['Percentile', 'Value'], ';')
let arr = $S.getBaseStats(variables, sample)

saveToCSV('./results/arr.csv', arr, ['Statistics', 'Value'], ';')
console.log('arr: ', arr)

let age = $S.getBaseStats(variables, subsetByProperty(person, 'age'))
saveToCSV('./results/age.csv', age, ['Statistics', 'Value'], ';')
console.log('person (age): ', age)
console.log('person (height): ', $S.getBaseStats(variables, subsetByProperty(person, 'height')))

// Makes a subset of an array of objects by an object property.
function subsetByProperty (obj, prop) {
  if (prop) {
    return obj.map(function (item) {
      return item[prop]
    })
  } else {
    return null
  }
}
