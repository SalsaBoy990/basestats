const request = require('request')

function getJSONFromURL (url, callback) {
  // check url needed...
  request(url, { json: true }, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      callback(error, null)
    }
    callback(null, JSON.stringify(body))
  })
}

// Makes a subset of an array of objects by an object property.
// Added to the prototype of getJSONFromURL() function
getJSONFromURL.prototype.subsetByProperty = function (obj, prop) {
  if (prop) {
    return obj.map(function (item) {
      return item[prop]
    })
  } else {
    return null
  }
}

// Add a method to a function, a different approach
// getJSONFromURL.subsetByProperty = subsetByProperty

module.exports = getJSONFromURL
