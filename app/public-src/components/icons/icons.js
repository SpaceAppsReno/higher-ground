import classes from 'app-utils/classes';
import styles from './icons.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	static propTypes = {
		presenting: React.PropTypes.bool.isRequired,
		dataset: React.PropTypes.string.isRequired,
		onGeolocate: React.PropTypes.func.isRequired,
		onDataset: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<div className={styles.main}>
				<br/>
				<Icon
					className={styles.filter}
					name="compass"
					onClick={ () => this.props.onGeolocate() }
				/>
				<br/>
				<br/>
				<Icon
					className={classes(styles.filter, styles.temperature, this.props.dataset === 'temperature' && styles.active)}
					name="thermometer-full"
					onClick={ () => this.props.onDataset('temperature') }
				/>
				<br/>
				<Icon
					className={classes(styles.filter, styles.vegetation, this.props.dataset === 'vegetation' && styles.active)}
					name="pagelines"
					onClick={ () => this.props.onDataset('vegetation') }
				/>
				<br/>
				<Icon
					className={classes(styles.filter, styles.precipitation, this.props.dataset === 'precipitation' && styles.active)}
					name="tint"
					onClick={ () => this.props.onDataset('precipitation') }
				/>
			</div>
		);
	}
}
