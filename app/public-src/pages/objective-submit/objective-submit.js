import styles from './objective-submit.scss';

import React, { Component } from 'react';
import Button from 'app-components/button/button';
import Page from 'app-components/page/page';

export default class ObjectiveSubmit extends Component {
	render() {
		return (
			<Page title="Objective Submit">
				<section className="about about-three">
					<div className="container">
						<div className="row" >
							<div className="col-md-12 col-sm-12 col-xs-12" style={{ marginTop: '2rem' }}>
								<div className="input-group input-group-lg">
									<span className="input-group-addon" id="sizing-addon1">Description</span>
									<input type="text" className="form-control" placeholder="Explain your submission..." aria-describedby="sizing-addon1" />
								</div>
							</div>
						</div>
						<div className="row" style={{ marginTop: '2rem' }}>
							<div className="col-md-6 col-sm-12 col-xs-12">
								<Button style={{ float: 'right' }}>Upload Photo</Button>
							</div>
							<div className="col-md-6 col-sm-12 col-xs-12">
								<Button>Upload Video</Button>
							</div>
						</div>
						<div className="row" >
							<div className="col-md-12 col-sm-12 col-xs-12" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
								<Button style={{ display: 'block', margin: '0 auto' }}>SUBMIT</Button>
							</div>
						</div>
					</div>
				</section>
			</Page>
		);
	}
}
