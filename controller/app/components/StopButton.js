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
export class StopButton extends Component {
	onPress() {
		if (this.props.enabled) {
			this.props.onPress();
		}
	}

	render() {
		const {
			enabled,
			size,
			style,
		} = this.props;
		const name = enabled ? 'ios-square' : 'ios-square-outline';

		return (
			<TouchableOpacity onPress={() => this.onPress}>
				<Icon
					name={name}
					size={size}
					color="gray"
					style={style}
				/>
			</TouchableOpacity>
		);
	}
}

StopButton.propTypes = {
	onPress: PropTypes.func,
	enabled: PropTypes.bool,
	size: PropTypes.number,
	style: View.propTypes.style,
};

StopButton.defaultProps = {
	onPress: () => null,
	enabled: false,
	size: 40,
};

export default StopButton;
