import styles from './landing.scss';
import API from 'app-api/objective';

import React, { Component } from 'react';
import Table from 'app-components/table/table';
import Page from 'app-components/page/page';

export default class Landing extends Component {
	constructor() {
		super();

		this.state = {
			nearby: null,
		};
	}

	async componentWillMount() {
		let nearby = await API.getRecent();
		nearby = nearby.slice(0, 3);

		this.setState({ nearby });
	}

	render() {
		return (
			<Page>
				<section className="banner-seven">
					<div className="banner-overlay">
						<div className="container" style={{ padding: '14rem 0 8rem' }}>
							<div className="row">
								<div className="col-md-12 col-sm-12 col-xs-12">
									{ this.state.nearby && this.state.nearby.length > 0 ? (
										<Table
											className={ styles.nearby }
											title="Nearby Tasks"
											headers={[
												{ label: 'Title', key: 'title' },
												{ label: 'Points', key: 'points' },
											]}
											data={ this.state.nearby }
											route={ ({ id }) => `/objective/${id}` }
										/>
									) : null }
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="about" className="about about-six padding-120">
					<div className="container">
						<div className="section-header text-center">
							<h2>About GamifyReno</h2>
							<p><em>Reno as an Interactive, Social Scavenger Hunt</em></p>
						</div>
						<p>
							For any who played Pokemon Go last summer, this idea should feel kind of familiar.
							The idea is to take a city, in this case Reno, and turn it into an interactive,
							social scavenger hunt. Through a web-based app, the user is able to seek and
							complete objectives scattered through the city, encouraging the user to explore
							and interact with other players as well as their neighbors and nearby friends.
						</p>
					</div>
				</section>
			</Page>
		);
	}
}
