import {
	MAP_CONTROLLER,
} from '../actions/actionTypes';

const initialState = {
	dataset: '',
	playing: false,
	stopEnabled: false,
	year: 200,
	yearEnd: 2000,
	yearStart: 0,
};

export default function mapControllerReducer(state = initialState, action = {}) {
	switch (action.type) {
		case MAP_CONTROLLER.DATASET:
			return {
				...state,
				dataset: action.payload,
			};

		case MAP_CONTROLLER.IS_PLAYING:
			return {
				...state,
				playing: action.payload,
			};

		case MAP_CONTROLLER.SET_YEAR:
			return {
				...state,
				year: action.payload,
			};

		case MAP_CONTROLLER.STOP_ENABLED:
			return {
				...state,
				stopEnabled: action.payload,
			};

		default:
			return state;
	}
}
