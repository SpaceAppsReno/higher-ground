import styles from './layout.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';
import Footer from './footer/footer';
import Header from './header/header';

export default class Layout extends Component {
	static propTypes = {
		navigation: React.PropTypes.arrayOf(React.PropTypes.shape({
			label: React.PropTypes.string.isRequired,
			to: React.PropTypes.string.isRequired,
		})).isRequired,
		className: React.PropTypes.string,
		children: React.PropTypes.node.isRequired,
	};

	render() {
		return (
			<div className={ classes(styles.main, this.props.className) }>
				<Header navigation={ this.props.navigation } />

				{ this.props.children }

				<Footer />
			</div>
		);
	}
}
