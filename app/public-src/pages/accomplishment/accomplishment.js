import get from 'app-components/api/get/get';
import API from 'app-api/accomplishment';

import React, { Component } from 'react';
import Page from 'app-components/page/page';
import Button from 'app-components/button/button';

@get(API)
export default class Accomplishment extends Component {
	static propTypes = {
		data: React.PropTypes.object,
	};

	render() {
		return (
			<Page title={ `Accomplishment: ${ this.props.data.title }` }>
				<section className="about about-three padding-120">
					<div className="container">
						<div className="row" style={{ marginBottom: '2rem' }}>
							<div className="col-md-12 col-sm-12 col-xs-12">
								<div className="row" >
									<div className="col-md-6 col-sm-12 col-xs-12">
										<Button>Points <span className="badge">{ this.props.data.points }</span></Button>
										<Button>Time <span className="badge">{ this.props.data.timestamp.toLocaleString() }</span></Button>
									</div>
									<div className="col-md-6 col-sm-12 col-xs-12">
										{ this.props.data.proof }
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Page>
		);
	}
}
