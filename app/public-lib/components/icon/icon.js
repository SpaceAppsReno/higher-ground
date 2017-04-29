import classes from 'app-utils/classes';
import styles from './icon.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Icon extends Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
		to: React.PropTypes.string,
		href: React.PropTypes.string,
	};
	
	render() {
		let { name, className, to, href, ...props } = this.props;
		
		let Tag = 'div';
		if (to) {
			Tag = Link;
		}
		else if (href) {
			Tag = 'a';
		}
		
		return (
			<Tag
				className={ classes('icon', styles.main, `fa fa-${ name }`, className) }
				to={ to }
				href={ href }
				{ ...props }
			/>
		);
	}
}
