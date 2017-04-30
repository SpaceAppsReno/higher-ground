import classes from 'app-utils/classes';
import styles from './player.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	static propTypes = {
		min: React.PropTypes.number.isRequired,
		max: React.PropTypes.number.isRequired,
	};

	constructor() {
		super();
		this.state = {
			year: 1994,
		};
	}

	handleChange = ({ target: { value: year } }) => {
		this.setState({ year });
	}
	
	handleChangeComplete = (e) => {
		console.log('Change event completed');
	}

	render() {
		return (
			<div className={classes(styles.main, { [styles.moveDown]: this.state.hidden }) }>
				<Icon
					className={classes(styles.reducBtn, styles.btn, { [styles.flip]: this.state.hidden }) } name='sort-down'
					onClick={ () => this.setState({ hidden: !this.state.hidden }) }
				></Icon>
				<div className={styles.year}>
					{this.state.year}
				</div>
				<div>
					<input
						className={styles.slider}
						type="range"
						value={this.state.year}
						min={this.props.min}
						max={this.props.max}
						onInput={this.handleChange}
						step={1} />
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
