import styles from './map.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

/* global google */
export default class Map extends Component {
	static propTypes = {
		className: React.PropTypes.string,
		dataset: React.PropTypes.oneOf([
			'temperature',
			'vegetation',
			'precipitation',
		]).isRequired,
		year: React.PropTypes.number.isRequired,
		bounds: React.PropTypes.shape({
			east: React.PropTypes.number.isRequired,
			north: React.PropTypes.number.isRequired,
			south: React.PropTypes.number.isRequired,
			west: React.PropTypes.number.isRequired,
		}),

		onBounds: React.PropTypes.func.isRequired,
	};

	registerMap(ref) {
		if (!ref) {
			return;
		}

		if (!this._map) {
			this.initialize(ref);
		}

		let bounds = this._map.getBounds();
		if (!bounds || !bounds.equals(this.props.bounds)) {
			this._map.fitBounds(this.props.bounds);
		}
		else {
			this.update();
		}
	}

	registerSearch(ref) {
		if (!ref) {
			return;
		}

		if (!this._search) {
			this._search = new google.maps.places.SearchBox(ref);

			this._search.addListener('places_changed', () => {
				let places = this._search.getPlaces();
				if (places.length === 0) {
					return;
				}

				places.forEach((place) => {
					if (!place.geometry) {
						return;
					}

					this._map.setCenter(place.geometry.location);
				});
			});
		}
	}

	initialize(ref) {
		this._map = new google.maps.Map(ref, {
			disableDefaultUI: true,
			styles: [
				{
					stylers: [
						{ invert_lightness: true },
						{ saturation: -100 },
						{ lightness: 33 },
						{ gamma: 0.5 },
					],
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [
						{ color: '#2d333c' },
					],
				},
			],
		});

		window.addEventListener('resize', () => {
			this._map.setCenter(this._map.fitBounds(this.props.bounds));
		});

		this._map.addListener('idle', () => {
			this.props.onBounds(this._map.getBounds().toJSON());
		});
	}

	update() {
		if (this.props.dataset !== 'temperature') {
			return;
		}

		console.log('update')
	}

	geolocate() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this._map.setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}

	render() {
		return (
			<div className={ classes(styles.main, this.props.className) }>
				<div
					className={ styles.map }
					ref={ (ref) => this.registerMap(ref) }
				/>
				<Icon className={styles.control} name='play'/>
				<input
					className={ styles.search }
					type="text"
					placeholder=""
					ref={ (ref) => this.registerSearch(ref) }
				/>

				{ this.props.dataset === 'temperature' ? null : (
					<div className={ styles.comingSoon }>
						coming soon
					</div>
				) }
			</div>
		);
	}
}
