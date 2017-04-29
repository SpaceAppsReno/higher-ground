import React, { Component } from 'react';
import Layout from './layout/layout';
import Subpages from 'app-components/subpages/subpages';

import Landing from './pages/landing/landing';
import Accomplishment from './pages/Accomplishment/Accomplishment';
import AccomplishmentList from './pages/accomplishment-list/accomplishment-list';
import Objective from './pages/objective/objective';
import ObjectiveSubmit from './pages/objective-submit/objective-submit';
import ObjectiveList from './pages/objective-list/objective-list';
import ObjectiveLanding from './pages/objective-landing/objective-landing';
import User from './pages/user/user';
import UserList from './pages/user-list/user-list';

export default class App extends Component {
	static contextTypes = {
		router: React.PropTypes.shape({
			route: React.PropTypes.shape({
				location: React.PropTypes.shape({
					pathname: React.PropTypes.string.isRequired,
				}).isRequired,
			}).isRequired,
			history: React.PropTypes.shape({
				listen: React.PropTypes.func.isRequired,
			}).isRequired,
		}).isRequired,
	};

	componentWillMount() {
		let pathname = this.context.router.route.location.pathname;
		this.context.router.history.listen(() => {
			if (this.context.router.route.location.pathname !== pathname) {
				pathname = this.context.router.route.location.pathname;
				window.scrollTo(0, 0);
			}
		});
	}

	render() {
		return (
			<Layout
				navigation={[
					{ label: 'Home', to: '/landing' },
					{ label: 'Objectives', to: '/objectives' },
					{ label: 'Users', to: '/users' },
					{ label: 'Accomplishments', to: '/accomplishments' },
				]}
			>
				<Subpages index="/landing" routes={[
					{ route: 'landing', Component: Landing },
					{ route: 'accomplishments', Component: AccomplishmentList, exact: true },
					{ route: 'accomplishment/:id', Component: Accomplishment },
					{ route: 'objectives', Component: ObjectiveLanding, exact: true },
					{ route: 'objective-submit', Component: ObjectiveSubmit, exact: true },
					{ route: 'objectives/:category', Component: ObjectiveList },
					{ route: 'objective/:id', Component: Objective },
					{ route: 'users', Component: UserList, exact: true },
					{ route: 'user/:id', Component: User },
				]} />
			</Layout>
		);
	}
}
