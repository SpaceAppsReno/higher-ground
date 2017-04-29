import React, { Component } from 'react';
import {
	AppRegistry,
} from 'react-native';
import {
	StackNavigator,
} from 'react-navigation';
import LoginScreen from './app/login/index';

const App = StackNavigator({
	Login: {screen: LoginScreen},
});

AppRegistry.registerComponent('controller', () => App);
