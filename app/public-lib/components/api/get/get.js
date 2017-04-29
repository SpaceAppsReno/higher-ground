import React, { Component } from 'react';
import Page from 'app-components/page/page';

export default function get(API) {
	return function wrapPage(PagePlain) {
		return class PageWrapped extends Component {
			static propTypes = {
				match: React.PropTypes.shape({
					params: React.PropTypes.shape({
						id: React.PropTypes.string.isRequired,
					}).isRequired,
				}).isRequired,
			};

			constructor() {
				super();

				this.state = {
					data: null,
				};
			}

			async componentWillMount() {
				let data = await API.get(this.props.match.params.id);

				this.setState({ data });
			}

			render() {
				if (!this.state.data) {
					return (
						<Page className="loading" />
					);
				}

				return (
					<PagePlain
						{ ...this.props }
						id={ this.props.match.params.id }
						data={ this.state.data }
					/>
				);
			}
		};
	};
}
