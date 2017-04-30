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

const componentStyles = StyleSheet.create({
	icon: {
		marginHorizontal: 7,
	},
});

@autobind
export class ProgressBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 1,
		};
	}

	calcLayout({nativeEvent: { layout: {x, y, width, height}}}) {
		console.log("calcLayout", width)
		this.setState({ width });
	}
	render() {
		const {
			progress,
			progressColor,
			style,
		} = this.props;
		const width = (progress / 100 * this.state.width) - 2; // subtract the borderWidth * 2

		return (
			<View
				onLayout={this.calcLayout}
				style={[{
					borderWidth: 1,
					borderColor: 'gray',
					flex: 1,
					flexDirection: 'column',
				}, style]}
			>
				<View style={{
					width,
					backgroundColor: progressColor,
					flex: 1,
				}} />
			</View>
		);
	}
}

ProgressBar.propTypes = {
	progress: PropTypes.number,
	progressColor: PropTypes.string,
	style: View.propTypes.style,
};

ProgressBar.defaultProps = {
	progress: 0,
	progressColor: 'yellow',
};

export default ProgressBar;
