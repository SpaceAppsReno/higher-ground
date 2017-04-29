import styles from './map.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';

/* global google */
export default class Map extends Component {
	static propTypes = {
		className: React.PropTypes.string,
		zoom: React.PropTypes.number.isRequired,
		center: React.PropTypes.shape({
			lat: React.PropTypes.number.isRequired,
			lng: React.PropTypes.number.isRequired,
		}).isRequired,
	};

	registerMap(ref) {
		if (!ref || this._map) {
			return;
		}

		this._map = new google.maps.Map(ref, {
			zoom: this.props.zoom,
			center: this.props.center,

			scrollwheel: false,
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

		this._marker = new google.maps.Marker({
			position: this.props.center,
			map: this._map,
		});

		window.addEventListener('resize', () => {
			this._map.setCenter(this._marker.getPosition());
		});
	}

	render() {
		return (
			<div className={ classes(styles.main, this.props.className) }>
				<div className={ styles.map } ref={ (ref) => this.registerMap(ref) } />
			</div>
		);
	}
}
