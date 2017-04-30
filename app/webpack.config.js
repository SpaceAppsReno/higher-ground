const config = require('./lib/webpack');

module.exports = config(__dirname, {
	title: 'Higher Ground',
	polyfill: true,
});
