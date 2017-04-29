import classes from 'app-utils/classes';
import styles from './big-number.scss';

import React, { Component } from 'react';

export default class Table extends Component {
	static propTypes = {
		category: React.PropTypes.string,
		amount: React.PropTypes.number,
		className: React.PropTypes.string,
	};
	render() {
		return (
		<div className={classes(styles.content, styles.main)}>
			<span className={styles.counter} data-count="24">{ this.props.amount }</span>
			<p>{ this.props.category }</p>
		</div>
		);
	}
}
