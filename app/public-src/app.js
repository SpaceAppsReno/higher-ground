import React, { Component } from 'react';
import Map from './components/map/map';
import Player from './components/player/player';
import Search from './components/search/search';
import Icon from 'app-components/icon/icon';

export default class App extends Component {
	render() {
		return (
			<div>
				<Search />
				<Icon style={{ color: 'white', zIndex: 3, fontSize: '4rem', position: 'absolute' }} name='compass'/>
				<Map zoom={10} center={{ lat: 39.5252966, lng: -119.8166583 }} />
				<Player handleChange={ (year) => {
					console.log(year);
				}}/>
			</div>
		);
	}
}
