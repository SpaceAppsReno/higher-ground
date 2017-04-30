import classes from 'app-utils/classes';
import styles from './search.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	render() {
		return (
			<div className={styles.main}>
				<form className={styles.search}>
					<input className={styles.searchTerm} placeholder="Enter your search term ..." /><input className={styles.searchButton} type="submit" />
				</form>
			</div>
		);
	}
}
