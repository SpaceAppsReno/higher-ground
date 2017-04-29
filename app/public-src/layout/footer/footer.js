import styles from './footer.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Layout extends Component {
	static propTypes = {
		className: React.PropTypes.string,
	};

	render() {
		return (
			<footer className={ classes('footer-six', styles.main, this.props.className) }>
				<div className="overlay home-six-overlay">
					<div className="container">
						<Link to="/">
							<img
								src={ require('./assets/images/logo.png') }
								alt="logo"
								className={ classes('img-responsive', styles.logo) }
							/>
						</Link>
					</div>
				</div>
			</footer>
		);
	}
}
