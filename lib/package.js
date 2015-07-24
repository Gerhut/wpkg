var _ = require('lodash')

function Package(name, description) {
  if (!(this instanceof Package)) {
    return new Package(name, description)
  }

  this.name = name
  this.description = description
}

Package.from$element = function from$element($element) {
  var name = $element.find('.name').text()
  var description = $element.find('.description').text()

  return new Package(name, description)
}

Package.prototype.match = function match(query) {
  return _.contains(this.name, query)
    || _.contains(this.description, query)
}

exports = module.exports = Package
