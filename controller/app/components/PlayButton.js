import React, {
	Component,
	PropTypes,
} from 'react';
import {
	Button,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import autobind from 'autobind-decorator';
import Icon from 'react-native-vector-icons/Ionicons';

@autobind
export class PlayButton extends Component {

	render() {
		const name = this.props.playing ? 'ios-pause' : 'ios-play';

		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon
					name={name}
					size={this.props.size}
					color="gray"
					style={this.props.style}
				/>
			</TouchableOpacity>
		);
	}
}

PlayButton.propTypes = {
	onPress: PropTypes.func,
	playing: PropTypes.bool,
	size: PropTypes.number,
	style: View.propTypes.style,
};

PlayButton.defaultProps = {
	onPress: () => null,
	playing: false,
	size: 40,
};

export default PlayButton;
