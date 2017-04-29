import styles from './header.scss';
import classes from 'app-utils/classes';

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default class Layout extends Component {
	static propTypes = {
		navigation: React.PropTypes.arrayOf(React.PropTypes.shape({
			label: React.PropTypes.string.isRequired,
			to: React.PropTypes.string.isRequired,
		})).isRequired,
		className: React.PropTypes.string,
	};

	constructor() {
		super();

		this.state = {
			fixed: false,
		};

		window.addEventListener('scroll', () => {
			if (!this.state.fix && window.scrollY > 100) {
				this.setState({ fixed: true });
			}

			if (this.state.fixed && window.scrollY <= 100) {
				this.setState({ fixed: false });
			}
		});
	}

	render() {
		return (
			<header className={ classes('header-six', styles.main, this.props.className) }>
				<nav className={ classes('main-menu menu-six menu-fixed', this.state.fixed && 'menu-six-bg animated fadeInDown') }>
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
								<img
									src={ require('./assets/images/logo.png') }
									alt="logo"
									className={ classes('img-responsive', styles.logo) }
								/>
							</Link>
						</div>
						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-right">
								{ this.props.navigation.map(({ label, to, children }) =>
									<Route key={ to } path={ to } children={ ({ match }) =>
										<li className={ classes(children && children.length && 'dropdown', match && 'active') }>
											<Link to={ to }>
												{ label }
												{ children && children.length ? (
													<span className="caret" />
												) : null }
											</Link>
											{ children && children.length ? (
												<ul className="dropdown-menu">
													{ children.map(({ label, to }) =>
														<Route key={ to } path={ to } children={ ({ match }) =>
															<li className={ classes(match && 'active') }>
																<Link to={ to }>{ label }</Link>
															</li>
														} />
													) }
												</ul>
											) : null }
										</li>
									} />
								) }
							</ul>
						</div>
					</div>
				</nav>
			</header>
		);
	}
}
