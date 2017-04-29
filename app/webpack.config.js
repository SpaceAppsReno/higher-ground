const config = require('./lib/webpack');

module.exports = config(__dirname, {
	title: 'Gamify Reno',
	polyfill: true,
});
