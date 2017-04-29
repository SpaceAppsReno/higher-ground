import styles from './error.scss';

import React, { Component } from 'react';
import Page from 'app-components/page/page';

export default class Error404 extends Component {
	componentWillMount() {
		if (navigator.userAgent.match(/Google/) && window.location.pathname !== '/error404') {
			window.location = '/error404';
		}
	}

	render() {
		return (
			<Page className={ styles.main } title="Error 404">
				<section className="error padding-120 text-center">
					<div className="container">
						<h2>4<span><i className="fa fa-microphone" aria-hidden="true"></i></span>4</h2>
						<h3>Oops, This Page Not Be Found!</h3>
						<p>We are really sorry but the page you requested is missing :(</p>
						<a href="index.html" className="default-button">go back home</a>
					</div>
				</section>
			</Page>
		);
	}
}
