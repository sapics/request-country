var getClientIp = require('request-ip').getClientIp;
var getGeo = require('geoip-country').lookup;

function isPrivateNetwork(ip) {
	//0.0.0.0 - 10.255.255.255, 172.16.0.0 - 172.31.255.255, 192.168.0.0 - 192.168.255.255, 127.0.0.1
	const privateIpRegexp = /(192\.168\.[0-9]+\.[0-9]+|10\.[0-9]+\.[0-9]+\.[0-9]+|172\.(1[6-9]|2[0-9]|3[0-2])\.[0-9]+\.[0-9]+|127\.0\.0\.1)/;
	return privateIpRegexp.test(ip);
}

function requestCountry(req, privateIpCountry) {
	var ip = getClientIp(req);
	if (privateIpCountry && isPrivateNetwork(ip)) {
		return privateIpCountry;
	} else {
		var geo = getGeo();
		return (geo && geo.country) || false;
	}
}

requestCountry.middleware = function(options){
	var attr = options && options.attributeName || 'requestCountryCode';
	var privateIpCountry = options && options.privateIpCountry || false;
	return function(req, res, next) {
		req[attr] = requestCountry(req, privateIpCountry);
		next();
	}
};

module.exports = requestCountry;
