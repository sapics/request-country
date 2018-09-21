var getClientIp = require('request-ip').getClientIp;
var getGeo = require('geoip-country').lookup;
// PRIVATE IP https://en.wikipedia.org/wiki/Private_network
// 10.0.0.0 - 10.255.255.255, 172.16.0.0 - 172.31.255.255, 192.168.0.0 - 192.168.255.255, 127.0.0.1
var privateIpReg = /^(?:192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[0-2])\.[0-9]+\.[0-9]+|127\.0\.0\.1)$/;

function requestCountry(req, privateIpCountry) {
	var ip = typeof req === 'string' ? req : getClientIp(req), geo = getGeo(ip);
	return geo ? geo.country : (privateIpCountry ? privateIpReg.test(ip) && privateIpCountry : false);
}

requestCountry.middleware = function(options) {
	var attr = options && options.attributeName || 'requestCountryCode';
	var privateIpCountry = options && options.privateIpCountry || false;
	return function(req, res, next) {
		req[attr] = requestCountry(req, privateIpCountry);
		next();
	}
};

module.exports = requestCountry;
