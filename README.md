Deprecated: please use <https://npms.io/> instead.

# wpkg (Which Package?)
Search most used npm packages.

## Install

    $ npm install -g wpkg

## Commend Line Usage

    $ wpkg web cache

## Node JS Usage

```js
var wpkg = require('wpkg')
wpkg(['web', 'cache']).on('package', function (package) {
  console.log(package.name, package.description)
}).on('error', function (err) {
  console.err(err.message)
})
```

## License

MIT
