import styles from './objective-landing.scss';
import API from 'app-api/objective';

import React, { Component } from 'react';
import Page from 'app-components/page/page';
import Category from 'app-components/category/category';
import Table from 'app-components/table/table';
import { Link } from 'react-router-dom';

export default class ObjectiveLanding extends Component {
	constructor() {
		super();

		this.state = {
			nearby: null,
		};
	}

	async componentWillMount() {
		let nearby = await API.getRecent();

		this.setState({ nearby });
	}

	render() {
		return (
			<Page title="Objectives">
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-sm-12 col-xs-12">
								{ this.state.nearby ? (
									<Table
										className={ styles.nearby }
										title="Nearby Objectives"
										headers={[
											{ label: 'Title', key: 'title' },
											{ label: 'Points', key: 'points' },
										]}
										data={ this.state.nearby }
										route={ ({ id }) => `/objective/${id}` }
									/>
								) : null }

								<Link to="/objectives/perform">
									<Category color="red" title="Perform" />
								</Link>
								<Link to="/objectives/travel">
									<Category color="blue" title="Travel" />
								</Link>
								<Link to="/objectives/create">
									<Category color="brown" title="Create" />
								</Link>
								<Link to="/objectives/help">
									<Category color="purple" title="Help" />
								</Link>
								<Link to="/objectives/buy">
									<Category color="black" title="Buy" />
								</Link>
							</div>
						</div>
					</div>
				</section>
			</Page>
		);
	}
}
