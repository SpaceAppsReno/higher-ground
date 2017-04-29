import React, { Component } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';

const componentStyles = StyleSheet({
	title: {

	},
});

export default class LoginScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{
				alignItems: 'center',
			}}>
				<Text style={componentStyles.title}>Please enter the code on the screen.</Text>
			</View>
		);
	}
}
