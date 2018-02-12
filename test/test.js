const stats = require('../stats')

let variables = [
  'min',
  'max',
  'sum',
  'amean',
  'Q1',
  'median',
  'Q3',
  'outliers',
  'variance',
  'stdev'
]

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

console.log('sample: ', stats(variables, sample))
console.log('person (age): ', stats(variables, subsetByProperty(person, 'age')))
console.log('person (height): ', stats(variables, subsetByProperty(person, 'height')))
