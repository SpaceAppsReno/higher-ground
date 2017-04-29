import styles from './category.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';

export default class Category extends Component {
	static propTypes = {
		title: React.PropTypes.string.isRequired,
		color: React.PropTypes.oneOf([
			'red',
			'blue',
			'purple',
			'brown',
			'black',
		]).isRequired,
	};
	render() {
		return (
			<section className={classes(styles.main, styles[this.props.color], 'pricing pricing-three')}>
				<div>
					<div className="container">
						<div className="pricing-items">
							<div className="row">
								<div className="col-md-12 col-sm-12 col-xs-12">
									<div className="pricing-item">
										<div className="pricing-header">
											<h2 className={classes(styles.amount, 'amount')}>{ this.props.title }</h2>
										</div>
										<div className={classes(styles.options, 'pricing-options')}>
											<div>
												<p>Available Points<span className={ styles.data }>150</span></p>
												<p>Available Objectives<span className={ styles.data }>25</span></p>
											</div>
										</div>
										<div className="pricing-button">
											<a href="#">ticket now</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
