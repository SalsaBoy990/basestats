// BASIC STATISTICAL FUNCTIONS
module.exports = {
  // Returns the sum of the two params.
  sum: function (x, y) { return x + y },

  // Returns the square of the argument.
  square: function (x) { return x * x },

  // Returns the smaller number from two params.
  min: function (x, y) { return (x < y) ? x : y },

  // Returns the larger number from two params.
  max: function (x, y) { return (x > y) ? x : y }
}
