import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Error from './error/error';

export default class Subpages extends Component {
	static propTypes = {
		path: React.PropTypes.string.isRequired,
		index: React.PropTypes.string,
		routes: React.PropTypes.arrayOf(React.PropTypes.shape({
			route: React.PropTypes.string.isRequired,
			exact: React.PropTypes.bool,
			Component: React.PropTypes.func,
			render: React.PropTypes.func,
		})).isRequired,
	};

	static defaultProps = {
		path: '',
	};

	render() {
		return (
			<Switch>
				{ this.props.index ? (
					<Route
						path={ `${ this.props.path }/` }
						exact={ true }
						render={ ({ location }) => (
							<Redirect
								to={{
									pathname: `${ this.props.path }${ this.props.index }`,
									hash: location.hash,
									search: location.search,
									state: location.state,
								}}
							/>
						) }
					/>
				) : null }
				{ this.props.routes.map(({ route, exact, Component, render }) =>
					<Route
						key={ route }
						path={ `${ this.props.path }/${ route }` }
						exact={ exact }
						component={ Component }
						render={ render }
					/>
				) }

				<Route component={ Error } />
			</Switch>
		);
	}
}
