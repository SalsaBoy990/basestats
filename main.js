require('./src/utilities/classof')

// basic statistical functions
const base = require('./src/stats/basics')

// percentile-related functions
const pc = require('./src/stats/percentile')

// Calculates arithmetic mean.
function amean (data) { return data.reduce(base.sum, 0) / data.length }

// Calculates variance.
function variance (data) {
  let mean = amean(data)
  let deviations = data.map(function (x) { return x - mean })
  return deviations.map(base.square).reduce(base.sum, 0) / (data.length - 1)
}

// Calculates standard deviation.
function stdev (data) { return Math.sqrt(variance(data)) }

module.exports = {
  // Statistical properties that you can calculate with basestats
  vars: [
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
  ],

  // Args:
  // stats: array containing the stats to calculate see the 'vars' property above
  // data: array containing the data to calculate stats from
  // error handling needs enhancements...
  getBaseStats: function (stats, data) {
    if (arguments.length === 0) {
      throw new Error('You did not supply all the arguments.')
    }
    if (!isArray(stats) || !isArray(data)) {
      throw new Error('Arguments of array type needed')
    }

    let result = {}
    let str
    for (let i = 0; i < stats.length; i++) {
      switch (str = stats[i]) {
        case 'sum': result[str] = data.reduce(base.sum, 0)
          break

        case 'min': result[str] = data.reduce(base.min)
          break

        case 'max': result[str] = data.reduce(base.max)
          break

        case 'amean': result[str] = amean(data)
          break

        case 'variance': result[str] = variance(data)
          break

        case 'stdev': result[str] = stdev(data)
          break

        case 'median': result[str] = pc.median(data)
          break

        case 'Q1': result[str] = pc.firstQuartile(data)
          break

        case 'Q3': result[str] = pc.thirdQuartile(data)
          break

        case 'outliers': result[str] = pc.getOutliers(data)
          break

        default:
          break
      }
    }
    return result
  },

  // Get the percentiles from 0 to 100
  // Arg: data: array containing the data to calculate stats from
  getAllPercentiles: function (data) {
    let result = {}
    for (let i = 0; i < 100; i++) {
      result[i] = pc.percentile(data, i)
    }
    return result
  },

   // Makes a subset of an array of objects by an object property.
   // Args: obj: the object; prop: the object property we need to subset
  subsetByProperty: function (obj, prop) {
    if (prop) {
      return obj.map(function (item) {
        return item[prop]
      })
    } else {
      return null
    }
  },

  // Save results into a CSV file, different separators are available
  saveToCSV: require('./src/export/save-csv'),

  // Get JSON from an URL.
  getJSONFromURL: require('./src/import/import-data')
}
