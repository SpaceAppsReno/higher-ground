import styles from './app.scss';
import APIController from 'app-api/controller/controller';

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
				east: -118.75,
				north: 42.5730323791504,
				south: 36.5056190490723,
				west: -121.25,
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

		this._controller = new APIController();
		this._controller.on('hello', ({ key }) => this.setState({ key, presenting: true }));
		this._controller.on('controller', () => this.setState({ key: null }));

		this._controller.on('dataset', (dataset) => this.setState({ dataset }));
		this._controller.on('year', (year) => this.setState({ year }));
		this._controller.on('bounds', (bounds) => this.setState({ bounds }));
		this._controller.on('geolocate', () => this._map && this._map.geolocate());
	}

	render() {
		if (this._controller) {
			this._controller.emit('config', {
				dataset: this.state.dataset,
				year: this.state.year,
				bounds: this.state.bounds,
			});
		}

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
					dataset={ this.state.dataset }
					presenting={ this.state.presenting }
					onDataset={ (dataset) => this.setState({ dataset }) }
					onGeolocate={ () => this._map && this._map.geolocate() }
				/>

				<Player
					year={this.state.year}
					min={2001}
					max={2100}
					presenting={ this.state.presenting }
					onYear={ (year) => this.setState({ year }) }
					onPresent={ () => this.initPresentation() }
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
