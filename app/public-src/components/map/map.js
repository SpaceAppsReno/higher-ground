import styles from './map.scss';
import classes from 'app-utils/classes';
import APIData from 'app-api/data/data';

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

		this._heatmap = new google.maps.visualization.HeatmapLayer({
			map: this._map,
		});

		window.addEventListener('resize', () => {
			this._map.setCenter(this._map.fitBounds(this.props.bounds));
		});

		this._map.addListener('idle', () => {
			this.props.onBounds(this._map.getBounds().toJSON());
		});

		this._radius = 2.5;
		this._map.addListener('zoom_changed', () => {
			let zoom = this._map.getZoom();
			this._heatmap.set('radius', this._radius * Math.pow(2, zoom));
		});
	}

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

	async update() {
		if (this.props.dataset !== 'temperature') {
			return;
		}

		let { lons, lats, data } = await APIData.getPoints({
			dataset: this.props.dataset,
			year: this.props.year,
			bounds: this.props.bounds,
		});

		let points = [];
		for (let lat in data) {
			for (let lon in data[lat]) {
				points.push({
					location: new google.maps.LatLng(lats[lat], lons[lon]),
					weight: data[lat][lon],
				});
			}
		}

		let zoom = this._map.getZoom();
		this._radius = getRadius(zoom, lats, lons);
		this._heatmap.set('radius', this._radius * Math.pow(2, zoom));

		this._heatmap.setData(points);
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

function getRadius(zoom, lats, lons) {
	let lat = Math.floor(lats.length / 2) - 1;
	let lon = Math.floor(lons.length / 2) - 1;
	let a = project(new google.maps.LatLng(lats[lat], lons[lon]));
	let b = project(new google.maps.LatLng(lats[lat + 1], lons[lon + 1]));

	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

// The mapping between latitude, longitude and pixels is defined by the web mercator projection.
const TILE_SIZE = 256;
function project(location) {
	let siny = Math.sin(location.lat() * Math.PI / 180);

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	siny = Math.min(Math.max(siny, -0.9999), 0.9999);

	return new google.maps.Point(
		TILE_SIZE * (0.5 + location.lng() / 360),
		TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
	);
}
