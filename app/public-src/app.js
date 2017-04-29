import React, { Component } from 'react';
import Map from './components/map/map';

export default class App extends Component {
	render() {
		return (
			<div><Map zoom={10} center={{ lat: 39.5252966, lng: -119.8166583 }}/></div>
		);
	}
}
