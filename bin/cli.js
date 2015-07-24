#!/usr/bin/env node

var _ = require('lodash')
var commander = require('commander')
var chalk = require('chalk')
var S = require('string')

var wpkg = require('../lib')
var package = require('../package.json')

function emphasize(queries, text) {
  return _.reduce(queries, function (Stext, query) {
    return Stext.replaceAll(query, chalk.bgRed(query))
  }, S(text)).s
}

commander
  .version(package.version)
  .description(package.description)
  .usage('[options] <queries ...>')
  .option('-m, --max <max>', 'Max results limit [10]', parseInt, 10)
  .parse(process.argv)

var queries = commander.args
var options = _.pick(commander, 'max')
wpkg(queries, options).on('package', function (package) {
  console.log('%s\t%s',
    chalk.bold(emphasize(queries, package.name)),
    emphasize(queries, package.description))
}).on('error', function (error) {
  console.err(error)
})
