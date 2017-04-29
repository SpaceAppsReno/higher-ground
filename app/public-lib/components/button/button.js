import classes from 'app-utils/classes';
import styles from './button.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const CLASSES = [
	'primary', 'secondary', 'success', 'alert', 'warning', 'disabled',
	'hollow', 'dropdown',
];

export default class Button extends Component {
	static propTypes = {
		variant: React.PropTypes.oneOfType([
			React.PropTypes.oneOf(CLASSES),
			React.PropTypes.arrayOf(
				React.PropTypes.oneOf(CLASSES),
			),
		]),
		visible: React.PropTypes.bool.isRequired,
		to: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.object,
		]),
		href: React.PropTypes.string,
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	};

	static defaultProps = {
		variant: 'primary',
		visible: true,
	};

	render() {
		let { children, className, variant, visible, ...props } = this.props;
		variant = (Array.isArray(variant) ? variant : [ variant ]).filter(v => v).map(v => `btn-${ v }`);

		if (!visible) {
			return null;
		}

		if (variant.includes('disabled')) {
			delete props.to;
			delete props.href;
			delete props.onClick;
		}

		let Tag = 'button';
		if (props.to) {
			Tag = Link;
		}
		if (props.href) {
			Tag = 'a';
		}

		return (
			<Tag className={ classes('btn', styles.main, className, ...variant) } { ...props }>
				{ children }
			</Tag>
		);
	}
}
