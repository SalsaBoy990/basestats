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
  getBaseStats: function (stats, data) {
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

  getAllPercentiles: function (data) {
    let result = {}
    for (let i = 0; i < 100; i++) {
      result[i] = pc.percentile(data, i)
    }
    return result
  }
}
