import classes from 'app-utils/classes';
import styles from './icons.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	render() {
		return (
			<div className={styles.main}>
				<br/>
				<Icon className={styles.filter} name='compass'/>
				<br/>
				<br/>
				<Icon className={styles.filter} name='thermometer-full'/>
				<br/>
				<Icon className={styles.filter} name='pagelines'/>
				<br/>
				<Icon className={styles.filter} name='tint'/>
			</div>
		);
	}
}
