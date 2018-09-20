var requestCountry = require('./index.js');

module.exports = {
	test1: function(test) {
		test.expect(1);

		var actual = requestCountry('31.17.106.227');
		test.equal(actual, 'DE');

		test.done();
	},
};
