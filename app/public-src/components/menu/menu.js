import classes from 'app-utils/classes';
import styles from './menu.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	/* static propTypes = {
		value: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		handleChange: React.PropTypes.func.isRequired,
		step: React.PropTypes.number,
	};*/

	/* static defaultProps = {
		visible: true,
	};*/

	constructor() {
		super();

		this.state = {
			hidden: false,
		};
	}

	render() {
		return (
			<div className={styles.wrapper}>
        <Icon
					className={styles.reducBtn} name='bars'
					onClick={ () => this.setState({ hidden: !this.state.hidden }) }
				></Icon>
        <div className={classes(styles.thing, { [styles.hide]: this.state.hidden })}>
        </div>
      </div>
		);
	}
}
