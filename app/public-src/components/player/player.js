import classes from 'app-utils/classes';
import styles from './player.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	static propTypes = {
		value: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		handleChange: React.PropTypes.func.isRequired,
		step: React.PropTypes.number,
	};

	static defaultProps = {
		visible: true,
	};

	render() {
		return (
			<div className={styles.main}>
				<div className={styles.year}>
					2100
				</div>
				<div>
					<input
						className={styles.slider}
						type="range"
						value={this.props.value}
						min={this.props.min}
						max={this.props.max}
						onInput={this.props.handleChange}
						step={this.props.step} />
				</div>
				<div className={styles.controls}>
					<Icon className={styles.control} name='backward'/>
					<Icon className={styles.control} name='play'/>
					<Icon className={styles.control} name='forward'/>
				</div>
			</div>
		);
	}
}
