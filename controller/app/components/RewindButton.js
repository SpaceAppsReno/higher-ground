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
export class RewindButton extends Component {
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
		const name = enabled ? 'ios-rewind' : 'ios-rewind-outline';

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

RewindButton.propTypes = {
	onPress: PropTypes.func,
	enabled: PropTypes.bool,
	size: PropTypes.number,
	style: View.propTypes.style,
};

RewindButton.defaultProps = {
	onPress: () => null,
	enabled: false,
	size: 40,
};

export default RewindButton;
