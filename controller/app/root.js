import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store/configStore';
import {
	StackNavigator,
} from 'react-navigation';
import LoginScreen from './containers/login';
import MapScreen from './containers/map';

const App = StackNavigator({
	Login: { screen: LoginScreen },
	MapScreen: { screen: MapScreen },
});

export default class Root extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

	}

	render () {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
