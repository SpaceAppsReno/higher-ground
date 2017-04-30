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
export class LocateButton extends Component {

	render() {
		const name = 'ios-locate-outline';

		return (
			<TouchableOpacity onPress={this.props.onPress}>
				<Icon
					name={name}
					size={32}
					color="gray"
					style={this.props.style}
				/>
			</TouchableOpacity>
		);
	}
}

LocateButton.propTypes = {
	onPress: PropTypes.func,
	enabled: PropTypes.bool,
	style: View.propTypes.style,
};

LocateButton.defaultProps = {
	onPress: () => null,
	enabled: false,
};

export default LocateButton;
