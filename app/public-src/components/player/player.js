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

	constructor() {
		super();

		this.state = {
			hidden: false,
			playing: false,
		};
	}

	render() {
		return (
			<div className={classes(styles.main, { [styles.moveDown]: this.state.hidden }) }>
				<Icon
					className={classes(styles.reducBtn, styles.btn, { [styles.flip]: this.state.hidden }) } name='sort-down'
					onClick={ () => this.setState({ hidden: !this.state.hidden }) }
				></Icon>
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
					<Icon className={classes(styles.control, styles.btn)} name='backward'/>
					<Icon className={classes(styles.control, styles.btn)} name={this.state.playing ? 'pause' : 'play'}
					onClick={ () => this.setState({ playing: !this.state.playing }) }/>
					<Icon className={classes(styles.control, styles.btn)} name='forward'/>
				</div>
			</div>
		);
	}
}
