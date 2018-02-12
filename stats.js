require('./classof')

// basic statistical functions
const base = require('./basestats')

// percentile-related functions
const pc = require('./percentile')

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

module.exports = function (stats, data) {
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

      case 'amean':
        result[str] = amean(data)
        break

      case 'variance':
        result[str] = variance(data)
        break

      case 'stdev':
        result[str] = stdev(data)
        break

      case 'median':
        result[str] = pc.median(data)
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
}

/* STATS.js v0.1 | (c) Andras Gulacsi 2017 | MIT license */
/* ;(function (global, anychart) {

  // MAIN FUNCTIONS FOR CHECKING INPUT, MAKING SUBSET OF INPUT
  // Checks if argument is an array.
  var checkArray = function (arr) {
      if (Array.isArray(arr) ) {
          if(arr.length > 0) {
              return true;
          }
          else {
              console.error("Your input array is empty.");
              return;
          }
      }
      else {
          throw new Error("Bad input. The argument is not an array, nor an array of objects!");
      }
  };

  // Makes a subset of an array of objects by an object property.
  var subsetByProperty = function (obj, prop) {
      if (prop) {
          return obj.map(function(item) {
              return item[prop];
          });
      }
      else {
          return null;
      }
  };

  // 'new' an object
  var Stats = function(input, args, prop) {
      return new Stats.init(input, args, prop);
  };

  // Prototype holds methods (to save memory space)
  Stats.prototype = {

      print: function () {
          for (var p in this.result) {
              console.log(p + ": " + this.result[p]);
          }
      },

      // Calculates statistics for arrays and arrays of objects and returns an object
      calculateStats: function() {
          if (checkArray(this.input) === undefined) {
              throw "No input data specified!";
          }
          if(this.args.length === 0) {
              throw "Argument list of statistics not specified.";
          }
          // If prop argument is supplied then array elements are objects
          var property = this.prop || 0;
          var subset = subsetByProperty(this.input, property)
  };

  // The actual object is created here, allowing us to 'new' an object without calling 'new'
  Stats.init = function(input, args, prop) {
      var self = this;

      // input: array to process. Elements are numbers or object literals, but with no nested objects!
      self.input = input;

      // args: user supplied array of statistics to calculate;
      self.args = args;

      // prop / optional string / : if array elements are objects, from which property or field you want to calculate statistics
      self.prop = prop;

      self.result = {};
  }

  // Trick borrowed from jQuery so we don't have to use the 'new' keyword
  Stats.init.prototype = Stats.prototype;

  // Attach the Stats to the global object, and provide a shorthand 'S$'
  global.Stats = global.S$ = Stats;

  // General printer function that prints object/array properties
  // Not useful for objects with nested object properties, or array of objects.
  global.objectPrinter = function (o) {
      "use strict";

      if (classOfObject(o)) {
          for (var p in o) {
              console.log(p + ": " + o[p]);
          }
      }
      else if (classOfArray(o)) {
          for (var i = 0, max = o.length; i < max; i++) {
              console.log(i + ': ' + o[i]);
          }
      }
      else if (classOfFunction(o)) {
          throw new Error("Argument is a Function object.")
      }
      // o is not an object.
      else {
          throw new Error("Argument of primitive type is forbidden in 'objectPrinter()' function.")
      }
  };

})(window, anychart); */
