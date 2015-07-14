#!/usr/bin/env node

var commander = require('commander')
var chalk = require('chalk')
var S = require('string')

var wpkg = require('../lib')

commander
  .version('0.0.1')
  .arguments('<query>')
  .action(function (query) {
    wpkg(query).on('package', function (package) {
      console.log(
        chalk.bgRed(package.name),
        S(package.description).replaceAll(query, chalk.red(query)).s)
    }).on('error', function (error) {
      console.err(error)
    })
  })

commander.parse(process.argv)
