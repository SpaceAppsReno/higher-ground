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
export class MapScreen extends Component {
	static navigationOptions = {
		headerLeft: () => (<Text>Log Out</Text>),
		title: 'Map Screen',
	};
	constructor(props) {
		super(props);
		this.state = {
			error: '',
		};
	}

	renderError() {
		const { error } = this.state;
		if (error) {
			return <Text style={componentStyles.error}>{error}</Text>;
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={componentStyles.screen}>
				<Text>Map Screen</Text>
				{this.renderError()}
			</View>
		);
	}
}

MapScreen.propTypes = {
	actions: PropTypes.object,
	code: PropTypes.string,
	registered: PropTypes.bool,
};

MapScreen.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
