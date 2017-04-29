import './global/main.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

window.onload = function() {
	const div = document.createElement('div');
	div.id = 'wrapper';
	document.body.appendChild(div);

	ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
};
