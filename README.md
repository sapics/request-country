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

If you want to set default value for [private network](https://en.wikipedia.org/wiki/Private_network) IPs, you can pass second argument. So if you open your site from private network or localhost it will be returned.

```javascript
  requestCountry(req, 'US');
```

You can get country code from ip address string as `requestCountry('2.2.2.2')`.


### As Connect Middleware

```javascript
var requestCountry = require('request-country');
app.use(requestCountry.middleware({
  attributeName: 'requestCountryCode', // default is 'requestCountryCode'
  privateIpCountry: 'US' // Result for private network IPs
}));

app.use(function(req, res) {
  res.end(req.requestCountryCode);
});
```

## LICENSE

This library use the [geoip-country](https://github.com/sapics/node-geoip-country) for getting country code.
Thus, the license of this library is based on that. See the [LICENSE](https://github.com/bluesmoon/node-geoip/blob/master/LICENSE) file for details.
