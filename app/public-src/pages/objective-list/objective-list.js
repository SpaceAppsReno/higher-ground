import API from 'app-api/objective';

import React, { Component } from 'react';
import Page from 'app-components/page/page';
import Table from 'app-components/table/table';

export default class ObjectiveList extends Component {
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
				<Page title="Objectives" className="loading" />
			);
		}

		return (
			<Page title="Objectives">
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-sm-12 col-xs-12">
								<Table
									headers={[
										{ label: 'Title', key: 'title' },
										{ label: 'Points', key: 'points' },
									]}
									data={ this.state.data }
									route={ ({ id }) => `/objective/${id}` }
								/>
							</div>
						</div>
					</div>
				</section>
			</Page>
		);
	}
}
