import classes from 'app-utils/classes';

import React, { Component } from 'react';

const TITLE = document.title;

export default class Page extends Component {
	static setTitle(title = []) {
		if (!Array.isArray(title)) {
			title = [ title ];
		}

		document.title = title.length ? `${ title.filter(v => v).join(' - ') } | ${ TITLE }` : TITLE;
	}

	static propTypes = {
		title: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.arrayOf(
				React.PropTypes.string,
			),
		]),
		className: React.PropTypes.string,
		children: React.PropTypes.node.isRequired,
	};

	componentDidMount() {
		this.constructor.setTitle(this.props.title);
	}

	render() {
		return (
			<div className={ classes(this.props.className) }>
				{ this.props.title && (
					<section className="page-header">
						<div className="container">
							<div className="content">
								<h1>{ Array.isArray(this.props.title) ? this.props.title[0] : this.props.title }</h1>
							</div>
						</div>
					</section>
				) }

				{ this.props.children }
			</div>
		);
	}
}
