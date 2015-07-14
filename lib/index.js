/*!
 * wpkg 0.0.1
 * Copyright (c) 2015 George Chung
 * MIT License
 */

var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

var request = require('request')
var cheerio = require('cheerio')

var URL = 'https://www.npmjs.com/browse/depended'
var COUNT_PER_PAGE = 36
var MAX = 10

function Wpkg(query) {
  var self = this
  var page = 0
  var count = 0

  if (!(self instanceof Wpkg))
    return new Wpkg(query)

  function load(page) {
    request.get(URL, {
      qs: { offset: (page || 0) * COUNT_PER_PAGE }
    }, loaded)
  }

  function loaded(err, response, body) {
    if (err)
      return self.emit('error', err)

    var $ = cheerio.load(body)

    $('.package-details').each(function () {
      var package = {
        name: $(this).find('.name').text(),
        description: $(this).find('.description').text()
      }
      if (package.name.indexOf(query) > -1
        || package.description.indexOf(query) > -1) {

        self.emit('package', package)

        count += 1
        if (count >= MAX)
          return false // break out the .each function
      }
    })

    if (count < MAX) {
      page += 1
      load(page)
    }
  }

  load(page)
}

inherits(Wpkg, EventEmitter)

module.exports = Wpkg