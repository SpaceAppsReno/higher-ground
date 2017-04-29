import get from 'app-components/api/get/get';
import API from 'app-api/user';

import React, { Component } from 'react';
import Button from 'app-components/button/button';
import Lipsum from 'app-components/lipsum/lipsum';
import Page from 'app-components/page/page';
import Table from 'app-components/table/table';

@get(API)
export default class User extends Component {
	static propTypes = {
		data: React.PropTypes.objectOf(API),
	};

	constructor() {
		super();

		this.state = {
			accomplishments: null,
		};
	}

	async componentWillMount() {
		let accomplishments = await this.props.data.getAccomplishments();

		this.setState({ accomplishments });
	}

	render() {
		return (
			<Page title={ `User: ${ this.props.data.id }` }>
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row" style={{ marginBottom: '2rem' }}>
							<div className="col-md-2 col-sm-4 col-xs-4">
								<img src={ this.props.data.avatar } />
							</div>
							<div className="col-md-10 col-sm-8 col-xs-8">
								<div className="row" >
									<div className="col-md-12 col-sm-12 col-xs-12">
										<Button>Points <span className="badge">{ this.props.data.points }</span></Button>
										<Button>Level <span className="badge">{ this.props.data.level }</span></Button>
									</div>
								</div>
								<Lipsum count={ 3 } />
							</div>
						</div>
						{ this.state.accomplishments && this.state.accomplishments.length > 0 ? (
							<div className="row" style={{ marginBottom: '2rem' }}>
								<div className="col-md-12 col-sm-12 col-xs-12">
									<Table
										title="Recent Accomplishments"
										headers={[
											{ label: 'User', key: 'user_id' },
											{ label: 'Points', key: 'points' },
										]}
										data={ this.state.accomplishments }
										route={ ({ id }) => `/accomplishment/${id}` }
									/>
								</div>
							</div>
						) : null }
					</div>
				</section>
			</Page>
		);
	}
}
