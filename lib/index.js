/*!
 * wpkg 0.0.2
 * Copyright (c) 2015 George Chung
 * MIT License
 */

var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

var _ = require('lodash')
var request = require('request')
var cheerio = require('cheerio')

var Package = require('./package')

var URL = 'https://www.npmjs.com/browse/depended'
var COUNT_PER_PAGE = 36

function Wpkg(queries, options) {
  var self = this
  var page = 0
  var count = 0

  if (!(self instanceof Wpkg))
    return new Wpkg(queries, options)

  if (typeof queries == 'string') {
    queries = [ queries ]
  }
  options = _.defaults(options || {}, {
    max: 10
  })

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
      var package = Package.from$element($(this))

      if (_.all(queries, package.match, package)) {
        self.emit('package', package)

        count += 1
        if (count >= options.max)
          return false // break out the .each function
      }
    })

    if (count < options.max) {
      page += 1
      load(page)
    }
  }

  load(page)
}

inherits(Wpkg, EventEmitter)

module.exports = Wpkg
