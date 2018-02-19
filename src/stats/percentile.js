const utils = require('../utilities/pc-utils')

// These statistics are needed to create a boxplot
module.exports = {
  getOutliers: getOutliers,
  percentile: percentile,
  firstQuartile: firstQuartile,
  median: median,
  thirdQuartile: thirdQuartile
}

// Calculate the p-th percentile. http://onlinestatbook.com/2/introduction/percentiles.html
// Args:
// arr: contains the values
// p: the p-th percentile
function percentile (arr, p) {
  var n = arr.length
  // sort array values in ascending order
  var values = utils.ascendingOrder(arr)
  // create rank array incrementing numbers from 1 to n
  var ranks = utils.createRankArray(n)

  // get the p-th percentile's rank
  var percentileRank = utils.getPercentileRank(p, n)

  // if the p-th percentile's rank is an integer return the value unchanged
  if (utils.isInteger(percentileRank)) {
    for (let i = 0; i < n; i++) {
      if (ranks[i] === percentileRank) {
        return values[i]
      }
    }
  } else { // if the rank is a decimal number
    let integerPart = Math.trunc(percentileRank)
    let decimalPart = percentileRank - integerPart

    let smallerValue
    let biggerValue

    for (let i = 0; i < n; i++) {
      // match the integer part
      if (ranks[i] === integerPart) {
        smallerValue = values[i]
        biggerValue = values[i + 1]
        break
      }
    }
    // get the p-th percentile's value
    return utils.getPercentileValue(decimalPart, smallerValue, biggerValue)
  }
}

// Calculates the 25th percentile (Q1)
// Arg:
// arr: array containing our data
function firstQuartile (arr) {
  return percentile(arr, 25)
}

// Calculates the 50th percentile (median, Q2)
// Arg:
// arr: array containing our data
function median (arr) { return percentile(arr, 50) }

// Calculates the 75th percentile (Q3)
// Arg:
// arr: array containing our data
function thirdQuartile (arr) {
  return percentile(arr, 75)
}

// Gets outliers that are outside of the range of Q3 + 1.5*IQR, and Q1 - 1.5*IQR. IQR = interquartile range.
// Arg:
// arr: array containing our data
function getOutliers (arr) {
  let n = arr.length

  // limits object containing the lower and upper limits
  let limits = lowerAndUpperLimits(arr)

  // array to push outlier values
  let outliers = []
  for (let i = 0; i < n; i++) {
    // over the upper limit
    if (arr[i] > limits.upperLimit) {
      outliers.push(arr[i])
    } else if (arr[i] < limits.lowerLimit) { // over the lower limit
      outliers.push(arr[i])
    }
  }
  // return outliers in ascending order
  return utils.ascendingOrder(outliers)
}

// Calculate the lower and upper limits of the whiskers
// Arg:
// arr: array containing our data
function lowerAndUpperLimits (arr) {
  var Q3 = thirdQuartile(arr)
  var Q1 = firstQuartile(arr)
  // Calculate IQR or Interquartile range
  var IQR = Q3 - Q1

  // calculate upper and lower limit with these expressions
  var upperLimit = Q3 + 1.5 * IQR
  var lowerLimit = Q1 - 1.5 * IQR

  // limits object
  return {
    lowerLimit: lowerLimit,
    upperLimit: upperLimit
  }
}
