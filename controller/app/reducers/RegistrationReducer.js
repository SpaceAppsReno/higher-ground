import {
	REGISTRATION,
} from '../actions/actionTypes';

const initialState = {
	code: '',
	error: '',
	registered: false,
};

export default function registrationReducer(state = initialState, action = {}) {
	switch (action.type) {
		case REGISTRATION.UPDATE_CODE:
			return {
				...state,
				code: action.payload,
			};
		case REGISTRATION.SET_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case REGISTRATION.SET_REGISTERED:
			return {
				...state,
				registered: action.payload,
			};
		default:
			return state;
	}
}
