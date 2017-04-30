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
	setError,
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
		textAlign: 'center',
	},
});

@autobind
export class LoginScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
		headerBackTitle: null,
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

	componentWillReceiveProps(nextProps) {
		const { navigate } = nextProps.navigation;
		if (nextProps.registered) {
			navigate('MapScreen');
		}
	}

	onChangeText(index, value) {
		const code = [...this.state.code];
		code[index] = value;
		let error = '';

		const reg = new RegExp('^[0-9]$');
		if (!reg.test(value) && value.length) {
			error = 'Invalid character.';
		}
		this.setState({ code });
		this.props.actions.setError({ error });
	}

	onPressRegister() {
		const codeCount = this.state.code.reduce((prev, val = '') => {
			return prev + val.trim().length;
		}, 0);
		if (codeCount < REGISTRATION_CODE_LENGTH) {
			this.props.actions.setError({ error: 'Invalid code.' });
		} else {
			this.props.actions.setError({ error: '' });
			this.props.actions.register({
				code: this.state.code.join(''),
			});
		}
	}

	renderError() {
		const { error } = this.props;
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
					keyboardType="numeric"
					maxLength={1}
					style={componentStyles.input}
					onChangeText={this.onChangeText.bind(this, index)}
					placeholder="0"
					value={code[index]}
				/>
			);
		});
	}

	render() {
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
	error: PropTypes.string,
	navigation: PropTypes.object,
	registered: PropTypes.bool,
};

LoginScreen.defaultProps = {
	registered: false,
};

const mapStateToProps = (state) => {
	return {
		code: state.registrationReducer.code,
		error: state.registrationReducer.error,
		registered: state.registrationReducer.registered,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			register,
			setError,
			updateCode,
		}, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
