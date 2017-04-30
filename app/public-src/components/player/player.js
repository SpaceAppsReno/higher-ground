import classes from 'app-utils/classes';
import styles from './player.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	static propTypes = {
		year: React.PropTypes.number.isRequired,
		min: React.PropTypes.number.isRequired,
		max: React.PropTypes.number.isRequired,
		presenting: React.PropTypes.bool.isRequired,
		onYear: React.PropTypes.func.isRequired,
	};

	constructor() {
		super();
		this.state = {
			hidden: false,
		};
	}

	handleChange = ({ target: { value: year } }) => {
		this.props.onYear(parseInt(year));
	}

	render() {
		return (
			<div className={classes(styles.main, { [styles.moveDown]: this.state.hidden }) }>
				<Icon
					className={classes(styles.reducBtn, styles.btn, { [styles.flip]: this.state.hidden }) } name='sort-down'
					onClick={ () => this.setState({ hidden: !this.state.hidden }) }
				></Icon>
				<div className={styles.year}>
					{this.props.year}
				</div>
				<div>
					<input
						className={styles.slider}
						type="range"
						value={this.props.year}
						min={this.props.min}
						max={this.props.max}
						onInput={this.handleChange}
						step={1} />
				</div>
				<div className={styles.controls}>
					<Icon className={classes(styles.control, styles.btn)} name='backward' onClick={() => {
						this.props.onYear(parseInt(this.props.year - 1));
					}}/>
					<Icon className={classes(styles.control, styles.btn)} name={this.state.playing ? 'pause' : 'play'}
					onClick={ () => {
						this.setState({ playing: !this.state.playing });
						let looper = setInterval(function() {
							this.props.year++;
							if (!this.state.playing && this.props.year === this.props.max)	{
								clearInterval(looper);
							}
						}, 1000);
					}}/>
					<Icon className={classes(styles.control, styles.btn)} name='forward' onClick={() => {
						this.props.onYear(parseInt(this.props.year + 1));
					}}/>
				</div>
			</div>
		);
	}
}
