import get from 'app-components/api/get/get';
import styles from './objective.scss';
import API from 'app-api/objective';

import React, { Component } from 'react';
import Button from 'app-components/button/button';
import Lipsum from 'app-components/lipsum/lipsum';
import Page from 'app-components/page/page';
import Map from 'app-components/map/map';
import Table from 'app-components/table/table';

@get(API)
export default class Objective extends Component {
	static propTypes = {
		data: React.PropTypes.object,
	};

	constructor() {
		super();

		this.state = {
			accomplishments: null,
		};
	}

	async componentWillMount() {
		let accomplishments = await this.props.data.getAccomplishments();
		accomplishments = accomplishments.slice(0, 3);

		this.setState({ accomplishments });
	}

	render() {
		return (
			<Page title={ `Objective: ${ this.props.data.title }` }>
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row" style={{ marginBottom: '2rem' }}>
							<div className="col-md-6 col-sm-12 col-xs-12">
								<Map center={ this.props.data.location } zoom={ 17 } />
							</div>
							<div className="col-md-6 col-sm-12 col-xs-12">
								<div className="row" >
									<div className="col-md-6 col-sm-12 col-xs-12">
										<Button>Points <span className="badge">{ this.props.data.points }</span></Button>
										<Button>Level <span className="badge">{ this.props.data.level }</span></Button>
									</div>
									<div className="col-md-6 col-sm-12 col-xs-12">
										<Button to="/objective-submit" className={ styles.buttonRight }>Submit</Button>
									</div>
								</div>

								<p style={{ fontWeight: 'bold', fontSize: '150%' }}>{ this.props.data.description }</p>
								<Lipsum count={ 2 } />
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
