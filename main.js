// classof functions
const check = require('./src/utilities/classof')

// basic statistical functions
const base = require('./src/stats/basics')

// percentile-related functions
const pc = require('./src/stats/percentile')

module.exports = {
  // Array of statistical properties that you can currently calculate
  vars: require('./src/stats/variables'),

  // Save results into a CSV file, different separators are available
  saveToCSV: require('./src/export/save-csv'),

  // Get JSON from an URL.
  // Args:
  // url: the location of the JSON file
  // first-error callback: the function invoked after file has been read
  getJSONFromURL: require('./src/import/import-data'),

  // Makes a subset of an array of objects by an object property.
  // Args:
  // obj: the object
  // prop: the object property we need to subset
  subsetByProperty: require('./src/utilities/subset'),

  // Calculate basic statistical properties
  // Args:
  // stats: array containing the stats to calculate see the 'vars' property above
  // data: array containing the data to calculate stats from
  // error handling needs enhancements...
  getBaseStats: function (stats, data) {
    if (arguments.length < 2) {
      throw new Error('You did not supply all the arguments.')
    }
    if (!check.isArray(stats) || !check.isArray(data)) {
      throw new Error('Arguments of array type needed.')
    }
    // To store the result object.
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

        case 'amean': result[str] = base.amean(data)
          break

        case 'variance': result[str] = base.variance(data)
          break

        case 'stdev': result[str] = base.stdev(data)
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
          console.error(`Cannot calculate the statistical property called: ${str}`)
          break
      }
    }
    return result
  },

  // Get the percentiles from 0 to 100
  // Arg:
  // data: array containing the data to calculate stats from
  getAllPercentiles: function (data) {
    let result = {}
    for (let i = 0; i <= 100; i++) {
      result[i] = pc.percentile(data, i)
    }
    return result
  }
}
