require('should')

var wpkg = require('../lib')

describe('wpkg', function () {
  this.timeout(10000)

  it('should search packages whose name or description include query', function (done) {
    var queries = ['of', 'the']
    wpkg(queries).once('package', function (package) {
      ;[
        package.name,
        package.description
      ].should.matchAny(function (value) {
        queries.should.matchEach(function (query) {
          value.should.containEql(query)
        })
      })
      done()
    }).once('error', done)
  })
})
