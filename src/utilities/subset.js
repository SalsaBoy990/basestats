module.exports = subsetByProperty

// Makes a subset of an array of objects by an object property.
// Args: obj: the object
// prop: the object property we need to subset
function subsetByProperty (obj, prop) {
  if (arguments.length < 2) {
    throw new Error('You did not supply all the arguments.')
  }
  if (prop) {
    return obj.map(function (item) {
      return item[prop]
    })
  } else {
    return null
  }
}
