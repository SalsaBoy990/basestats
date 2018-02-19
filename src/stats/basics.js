// BASIC STATISTICAL FUNCTIONS
module.exports = {
  sum: sum,
  square: square,
  min: min,
  max: max,
  amean: amean,
  variance: variance,
  stdev: stdev
}

// Returns the sum of the two params.
function sum (x, y) { return x + y }

// Returns the square of the argument.
function square (x) { return x * x }

// Returns the smaller number from two params.
function min (x, y) { return (x < y) ? x : y }

// Returns the larger number from two params.
function max (x, y) { return (x > y) ? x : y }

// Calculates arithmetic mean from array data.
function amean (data) { return data.reduce(sum, 0) / data.length }

// Calculates variance from array data.
function variance (data) {
  let mean = amean(data)
  let deviations = data.map(function (x) { return x - mean })
  return deviations.map(square).reduce(sum, 0) / (data.length - 1)
}

// Calculates standard deviation from array data.
function stdev (data) { return Math.sqrt(variance(data)) }
