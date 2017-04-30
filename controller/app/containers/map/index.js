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
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	register,
	updateCode,
} from '../../actions/registrationActions';
import {
	sendDataset,
	sendPlaying,
	sendRegion,
	sendStop,
} from '../../actions/mapControllerActions';
import RewindButton from '../../components/RewindButton';
import PlayButton from '../../components/PlayButton';
import StopButton from '../../components/StopButton';
import FFButton from '../../components/FFButton';
import ProgressBar from '../../components/ProgressBar';
import LocateButton from '../../components/LocateButton';
import ThermometerButton from '../../components/ThermometerButton';
import VegetationButton from '../../components/VegetationButton';
import WaterButton from '../../components/WaterButton';
import WSService from '../../services/WSService';
import MapView from 'react-native-maps';

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
	map: {
    ...StyleSheet.absoluteFillObject,
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

	changeRegion(data) {
		console.log("changeRegion", data)
		this.props.actions.sendRegion(data)
	}

	onChangeSearch() {

	}

	locateUser() {
		WSService.send('geolocate');
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

	renderDatasetControls() {
		const { dataset } = this.props;
		const thermometerSelected = dataset === 'temperature';
		const vegetationSelected = dataset === 'vegetation';
		const waterSelected = dataset === 'water';
		return (
			<View style={{
					marginRight: 7,
					justifyContent: 'center',
					alignItems: 'center'
			}}>
				<ThermometerButton
					onPress={() => this.props.actions.sendDataset({ dataset: 'temperature' })}
					selected={thermometerSelected}
					style={{
						marginBottom: 14,
					}}
				/>
				<VegetationButton
					onPress={() => this.props.actions.sendDataset({ dataset: 'vegetation' })}
					selected={vegetationSelected}
					style={{
						marginBottom: 14,
					}}
				/>
				<WaterButton
					onPress={() => this.props.actions.sendDataset({ dataset: 'water' })}
					selected={waterSelected}
				/>
			</View>
		)
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
			}}>
				<View style={{
					flexGrow: 1,
				}}>
					<MapView
						region={this.props.region}
						onRegionChange={this.changeRegion}
						style={componentStyles.map}
					/>
				</View>
			</View>
		);
	}

	renderProgressBar() {
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
				<View style={{
					flexDirection: 'row',
					flex: 1,
					marginTop: 7,
				}}>
					{this.renderMapTouchArea()}
					{this.renderDatasetControls()}
				</View>
				{this.renderControls()}
			</View>
		);
	}
}

MapScreen.propTypes = {
	actions: PropTypes.object,
	code: PropTypes.string,
	dataset: PropTypes.string,
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
		dataset: state.mapControllerReducer.dataset,
		ffEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearEnd,
		playing: state.mapControllerReducer.playing,
		region: state.mapControllerReducer.region,
		registered: state.registrationReducer.registered,
		rewindEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearStart,
		stopEnabled: state.mapControllerReducer.year !== state.mapControllerReducer.yearStart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			register,
			sendDataset,
			sendPlaying,
			sendRegion,
			sendStop,
			updateCode,
		}, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
