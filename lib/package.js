var S = require('string')

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
  return S(this.name).contains(query)
    || S(this.description).contains(query)
}

exports = module.exports = Package
