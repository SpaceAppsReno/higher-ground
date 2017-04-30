import React, {
	Component,
	PropTypes,
} from 'react';
import ReactNative, {
	Button,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autobind from 'autobind-decorator';
import Icon from 'react-native-vector-icons/Ionicons';
import {
	register,
	updateCode,
} from '../../actions/registrationActions';
import {
	sendPlaying,
	sendStop,
} from '../../actions/mapControllerActions';
import RewindButton from '../../components/RewindButton';
import PlayButton from '../../components/PlayButton';
import StopButton from '../../components/StopButton';
import FFButton from '../../components/FFButton';
import ProgressBar from '../../components/ProgressBar';
import LocateButton from '../../components/LocateButton';

const componentStyles = StyleSheet.create({
	screen: {
		alignItems: 'center',
		flexGrow: 1,
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
		title: 'Map Controller',
	};
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			playing: false,
			stopEnabled: true,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.registered) {
			this.props.navigation.goBack(null);
		}
	}

	onChangeSearch() {

	}

	locateUser() {
		console.log("Navigator", navigator)
		navigator.geolocation.getCurrentPosition((...args) => {
			console.log("success", args)
		}, (err) => {
			console.log("err", err);
		}, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
	}

	renderControls() {
		const {
			ffEnabled,
			rewindEnabled,
			stopEnabled,
		} = this.props;

		return (
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
				<RewindButton
					enabled={rewindEnabled}
					onPress={() => null}
					size={50}
					style={{
						marginHorizontal: 14,
					}}
				/>
				<PlayButton
					playing={this.props.playing}
					onPress={() => this.props.actions.sendPlaying({ playing: !this.props.playing })}
					size={50}
					style={{
						marginRight: 14,
					}}
				/>
				<StopButton
					enabled={stopEnabled}
					onPress={() => this.props.actions.sendStop({ stopEnabled: !this.props.stopEnabled })}
					size={40}
					style={{
						marginRight: 14,
					}}
				/>
				<FFButton
					enabled={ffEnabled}
					onPress={() => null}
					size={50}
					style={{
						marginRight: 14,
					}}
				/>
			</View>
		);
	}

	renderError() {
		const { error } = this.state;
		if (error) {
			return <Text style={componentStyles.error}>{error}</Text>;
		}
	}

	renderMapTouchArea() {
		return (
			<View style={{
				backgroundColor: 'gray',
				borderColor: 'yellow',
				borderWidth: 1,
				flexDirection: 'row',
				flexGrow: 1,
				marginHorizontal: 7,
				marginTop: 7,
			}}>
				<View style={{
					flexGrow: 1,
				}} />
			</View>
		);
	}

	renderProgressBar() {
		console.log("renderProgressBar")
		return (
			<ProgressBar
				progress={100}
				style={{
					marginVertical: 7,
					marginLeft: 7,
				}}
			/>
		);
	}

	renderSearch() {
		return (
			<View style={{
				flexDirection: 'row',
				marginHorizontal: 7,
				alignItems: 'center',
				marginTop: 7,
			}}>
				<TextInput
					maxLength={100}
					style={{
						flex: 1,
						height: 40,
						borderWidth: 1,
						borderColor: 'gray',
					}}
					onChangeText={this.onChangeSearch}
					value={''}
				/>
				<LocateButton
					onPress={this.locateUser}
					style={{
						marginLeft: 7,
					}}
				/>
			</View>
		);
	}

	render() {
		return (
			<View style={componentStyles.screen}>
				{this.renderSearch()}
				{this.renderError()}
				{this.renderMapTouchArea()}
				{this.renderControls()}
			</View>
		);
	}
}

MapScreen.propTypes = {
	actions: PropTypes.object,
	code: PropTypes.string,
	ffEnabled: PropTypes.bool,
	playing: PropTypes.bool,
	navigation: PropTypes.object,
	registered: PropTypes.bool,
	rewindEnabled: PropTypes.bool,
	stopEnabled: PropTypes.bool,
};

MapScreen.defaultProps = {
	playing: false,
	registered: true,
};

const mapStateToProps = (state) => {
	return {
		code: state.registrationReducer.code,
		ffEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearEnd,
		playing: state.mapControllerReducer.playing,
		registered: state.registrationReducer.registered,
		rewindEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearStart,
		stopEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearStart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			register,
			sendPlaying,
			sendStop,
			updateCode,
		}, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
