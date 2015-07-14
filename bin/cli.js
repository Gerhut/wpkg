#!/usr/bin/env node

var commander = require('commander')

var wpkg = require('../lib')

commander
  .version('0.0.1')
  .arguments('<query>')
  .action(function (query) {
    wpkg(query).on('package', function (package) {
      console.log(package.name, package.description)
    }).on('error', function (error) {
      console.err(error)
    })
  })

commander.parse(process.argv)
