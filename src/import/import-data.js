const request = require('request')

module.exports = getJSONFromURL

// Get JSON from an URL.
// Args:
// url: the location of the JSON file
// first-error callback: the function invoked after file has been read
function getJSONFromURL (url, callback) {
  // checking url needed...
  request(url, { json: true }, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      callback(error, null)
    }
    callback(null, JSON.stringify(body))
  })
}
