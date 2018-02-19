module.exports = {
  // Is object type an "Object"?
  isObject: function (o) { return classOf(o) === 'Object' },

  // Is object type an "Array"?
  isArray: function (o) { return classOf(o) === 'Array' },

  // Is object type a "Function"?
  isFunction: function (o) { return classOf(o) === 'Function' },
}

// classOf function to determine the object type (Object, Array, Function)
function classOf (o) {
  if (o === null) {
    return 'Null'
  }
  if (o === undefined) {
    return 'Undefined'
  }
  return Object.prototype.toString.call(o).slice(8, -1)
}
