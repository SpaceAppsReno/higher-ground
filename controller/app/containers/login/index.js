import React, {
	Component,
	PropTypes,
} from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import {
	register,
	updateCode,
} from '../../actions/registrationActions';
import { REGISTRATION_CODE_LENGTH } from '../../constants';

const componentStyles = StyleSheet.create({
	screen: {
		alignItems: 'center',
	},
	error: {
		color: 'red',
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginRight: 7,
	},
});

@autobind
export class LoginScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
	};
	constructor(props) {
		super(props);

		const code = props.code.split('');
		if (code.length < REGISTRATION_CODE_LENGTH) {
			for (let i = code.length; i < REGISTRATION_CODE_LENGTH; i++) {
				code.push('');
			}
		}
		this.state = {
			code,
		};
	}

	onChangeText(index, value) {
		console.log("onChangeText", arguments)
		const code = [...this.state.code];
		code[index] = value;
		let error = '';

		const reg = new RegExp('^[0-9]$');
		if (!reg.test(value) && value.length) {
			error = 'Invalid character.';
		}
		this.setState({ code, error });
	}

	onPressRegister() {
		const codeCount = this.state.code.reduce((prev, val = '') => {
			return prev + val.trim().length;
		}, 0);
		if (codeCount < REGISTRATION_CODE_LENGTH) {
			this.setState({ error: 'Invalid code.' });
		} else {
			this.setState({ error: '' });
			this.props.actions.register({
				code: this.state.code.join(''),
			});
		}
	}

	renderError() {
		const { error } = this.state;
		if (error) {
			return <Text style={componentStyles.error}>{error}</Text>;
		}
	}

	renderInputBoxes() {
		const { code } = this.state;
		return this.state.code.map((number, index) => {
			return (
				<TextInput
					key={index}
					maxLength={1}
					style={componentStyles.input}
					onChangeText={this.onChangeText.bind(this, index)}
					value={code[index]}
				/>
			);
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={componentStyles.screen}>
				<Text>Please enter the code on the screen.</Text>
				{this.renderError()}
				<View style={{
					flexDirection: 'row',
					marginLeft: 7,
				}}>
					{this.renderInputBoxes()}
				</View>
				<Button
					onPress={this.onPressRegister}
					title="Register"
					color="#841584"
					accessibilityLabel="Register"
				/>
			</View>
		);
	}
}

LoginScreen.propTypes = {
	actions: PropTypes.object,
	code: PropTypes.string,
	registered: PropTypes.bool,
};

LoginScreen.defaultProps = {
	registered: false,
};

const mapStateToProps = (state) => {
	return {
		code: state.registrationReducer.code,
		registered: state.registrationReducer.registered,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			register,
			updateCode,
		}, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
