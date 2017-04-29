import classes from 'app-utils/classes';
import styles from './player.scss';

import React, { Component } from 'react';
import Icon from 'app-components/icon/icon';

export default class Player extends Component {
	static propTypes = {
		// variant: React.PropTypes.oneOfType([
		// 	React.PropTypes.oneOf(CLASSES),
		// 	React.PropTypes.arrayOf(
		// 		React.PropTypes.oneOf(CLASSES),
		// 	),
		// ]),
		// visible: React.PropTypes.bool.isRequired,
		// to: React.PropTypes.oneOfType([
		// 	React.PropTypes.string,
		// 	React.PropTypes.object,
		// ]),
		// href: React.PropTypes.string,
		// className: React.PropTypes.string,
		// children: React.PropTypes.node,
	};

	static defaultProps = {
		visible: true,
	};

	render() {
		return (
			<div className={styles.main}>
				<Icon name='play'/>
			</div>
		);
	}
}
