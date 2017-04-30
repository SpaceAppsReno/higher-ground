import React, { Component } from 'react';
import Map from './components/map/map';
import Player from './components/player/player';
import Search from './components/search/search';
import Icons from './components/icons/icons';

export default class App extends Component {
	render() {
		return (
			<div>
				<Map zoom={10} center={{ lat: 39.5252966, lng: -119.8166583 }} />
				<Icons />
				<Player handleChange={ (year) => {
					console.log(year);
				}}/>
			</div>
		);
	}
}
