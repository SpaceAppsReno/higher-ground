import styles from './app.scss';
import Controller from 'app-controller/controller';

import React, { Component } from 'react';
import Map from './components/map/map';
import Player from './components/player/player';
import Icons from './components/icons/icons';

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			presenting: false,
			key: null,

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

	initPresentation() {
		if (this._controller) {
			return;
		}

		this._controller = new Controller();
		this._controller.on('hello', ({ key }) => this.setState({ key }));
		this._controller.on('controller', () => this.setState({ key: null }));

		this._controller.on('dataset', (dataset) => this.setState({ dataset }));
		this._controller.on('year', (year) => this.setState({ year }));
		this._controller.on('bounds', (bounds) => this.setState({ bounds }));
		this._controller.on('geolocate', () => this._map && this._map.geolocate());

		this.setState({ presenting: true });
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
					presenting={ this.state.presenting }
				/>

				<Icons
					onDataset={ (dataset) => this.setState({ dataset }) }
					onGeolocate={ () => this._map && this._map.geolocate() }
					onPresent={ () => this.initPresentation() }
					presenting={ this.state.presenting }
				/>

				<Player
					onYear={ (year) => this.setState({ year }) }
					min={1994}
					max={2100}
					presenting={ this.state.presenting }
				/>

				{ this.state.key ? (
					<div className={ styles.key }>
						{ this.state.key }
					</div>
				) : null }
			</div>
		);
	}
}
