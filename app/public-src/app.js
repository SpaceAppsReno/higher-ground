import React, { Component } from 'react';
import Map from './components/map/map';
import Player from './components/player/player';

export default class App extends Component {
	render() {
		return (
			<div>
				<Map zoom={10} center={{ lat: 39.5252966, lng: -119.8166583 }} />
				<Player />
			</div>
		);
	}
}
