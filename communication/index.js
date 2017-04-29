/* eslint-disable no-console */
process.on('unhandledRejection', (error, promise) => {
	console.error('Unhandled Rejection', promise);
	throw error;
});

require('babel-register')();

require('./app');
