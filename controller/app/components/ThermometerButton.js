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
import Icon from 'react-native-vector-icons/FontAwesome';

@autobind
export class ThermometerButton extends Component {
	onPress() {
		if (this.props.enabled) {
			this.props.onPress();
		}
	}

	render() {
		const {
			selected,
			size,
			style,
		} = this.props;
		const name = 'thermometer-full';
		const color = selected ? 'red' : 'gray';

		return (
			<TouchableOpacity onPress={this.onPress}>
				<Icon
					name={name}
					size={size}
					color={color}
					style={style}
				/>
			</TouchableOpacity>
		);
	}
}

ThermometerButton.propTypes = {
	onPress: PropTypes.func,
	enabled: PropTypes.bool,
	selected: PropTypes.bool,
	size: PropTypes.number,
	style: View.propTypes.style,
};

ThermometerButton.defaultProps = {
	onPress: () => null,
	enabled: true,
	selected: false,
	size: 40,
};

export default ThermometerButton;
