# request-country [![NPM version](https://badge.fury.io/js/request-country.svg)](https://badge.fury.io/js/request-country)

Get 2-letter country code from http request in nodejs.

## Installation

```
npm i request-country
```

## Usage

```javascript
var http = require('http');
var requestCountry = require('request-country');
var server = http.createServer(function(req, res) {
  console.log(requestCountry(req));
  // If it cannot detect country code from request ip,
  // the function return false.
});
```

### As Connect Middleware

```javascript
var requestCountry = require('request-country');
app.use(requestCountry.middleware({
  attributeName: 'requestCountryCode'
  // default attributeName is 'requestCountryCode'
}));

app.use(function(req, res) {
  res.end(req.requestCountryCode);
});
```

## LICENSE

This library use the [geoip-country](https://github.com/sapics/node-geoip-country) for getting country code.
Thus, the license of this library is based on that. See the [LICENSE](https://github.com/bluesmoon/node-geoip/blob/master/LICENSE) file for details.
