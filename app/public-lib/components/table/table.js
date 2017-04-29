import styles from './table.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';

export default class Table extends Component {
	static contextTypes = {
		router: React.PropTypes.shape({
			history: React.PropTypes.shape({
				push: React.PropTypes.func.isRequired,
			}).isRequired,
		}).isRequired,
	};

	static propTypes = {
		headers: React.PropTypes.arrayOf(React.PropTypes.shape({
			label: React.PropTypes.string.isRequired,
			key: React.PropTypes.string.isRequired,
		})).isRequired,
		data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		className: React.PropTypes.string,
		title: React.PropTypes.string,
		route: React.PropTypes.func,
	};

	render() {
		return (
			<div className={ classes('table-responsive', styles.main, this.props.className) }>
				<table>
					<caption>{ this.props.title }</caption>
					<thead>
						<tr>
							{ this.props.headers.map(({ label, key }) =>
								<th key={ key }>{ label }</th>
							) }
						</tr>
					</thead>
					<tbody>
						{ this.props.data.map((data) =>
							<tr
								key={ data.id }
								onClick={ this.props.route
									? () => this.context.router.history.push(
										this.props.route(data)
									) : null
								}
							>
								{ this.props.headers.map(({ key }, index) =>
									<td key={ key }>{ data[key] }</td>
								) }
							</tr>
						) }
					</tbody>
				</table>
			</div>
		);
	}
}
