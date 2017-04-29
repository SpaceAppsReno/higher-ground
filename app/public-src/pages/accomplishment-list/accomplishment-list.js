import API from 'app-api/accomplishment';

import React, { Component } from 'react';
import Page from 'app-components/page/page';
import Table from 'app-components/table/table';

export default class AccomplishmentList extends Component {
	constructor() {
		super();

		this.state = {
			data: null,
		};
	}

	async componentWillMount() {
		let data = await API.getRecent();

		this.setState({ data });
	}

	render() {
		if (!this.state.data) {
			return (
				<Page title="Accomplishments" className="loading" />
			);
		}

		return (
			<Page title="Accomplishments">
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-sm-12 col-xs-12">
								<Table
									headers={[
										{ label: 'User', key: 'user_id' },
										{ label: 'Points', key: 'points' },
									]}
									data={ this.state.data }
									route={ ({ id }) => `/accomplishment/${id}` }
								/>
							</div>
						</div>
					</div>
				</section>
			</Page>
		);
	}
}
