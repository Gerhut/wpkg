require('should')

var wpkg = require('../lib')

describe('wpkg', function () {
  this.timeout(10000)
  
  it('should search packages whose name or description include query', function (done) {
    var query = 'http'
    wpkg(query).once('package', function (package) {
      ;[
        package.name,
        package.description
      ].should.matchAny(function (value) {
        value.should.containEql(query)
      })
      done()
    }).once('error', done)
  })

  it('should return package in order of download count')
})