import styles from './app.scss';

import React, { Component } from 'react';
import Map from './components/map/map';
import Player from './components/player/player';
import Icons from './components/icons/icons';

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			dataset: 'temperature',
			year: 2050,
			bounds: {
				east: -119.75490311964109,
				north: 39.538635617749755,
				south: 39.51195501951582,
				west: -119.87841348035886,
			},
		};
	}

	registerMap(ref) {
		this._map = ref;
	}

	render() {
		return (
			<div className={styles.mainWrapper}>
				<Map
					ref={ (ref) => this.registerMap(ref) }
					dataset={ this.state.dataset }
					year={ this.state.year }
					bounds={ this.state.bounds }

					onBounds={ (bounds) => this.setState({ bounds }) }
				/>

				<Icons
					onDataset={ (dataset) => this.setState({ dataset }) }
					onGeolocate={ () => this._map && this._map.geolocate() }
				/>
				<Player
					onYear={ (year) => this.setState({ year }) }
					min={1994}
					max={2100}
					step={1}
				/>
			</div>
		);
	}
}
