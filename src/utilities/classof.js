// classOf function to determine the object type (Object, Array, Function)
module.exports = (function () {
  function classOf (o) {
    if (o === null) {
      return 'Null'
    }
    if (o === undefined) {
      return 'Undefined'
    }
    return Object.prototype.toString.call(o).slice(8, -1)
  };

  // Is object type an "Object"?
  global.isObject = function (o) {
    return classOf(o) === 'Object'
  }

  // Is object type an "Array"?
  global.isArray = function (o) {
    return classOf(o) === 'Array'
  }

  // Is object type a "Function"?
  global.isFunction = function (o) {
    return classOf(o) === 'Function'
  }
}())
