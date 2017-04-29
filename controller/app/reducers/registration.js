import {
	REGISTRATION,
	SET_REGISTERED,
} from '../actions/actionTypes';

const initialState = {
	code: '1234',
	registered: false,
};

export default function registrationReducer(state = initialState, action = {}) {
	switch (action.type) {
		case REGISTRATION.UPDATE_CODE:
			return {
				...state,
				code: action.payload,
			};
		case REGISTRATION.SET_REGISTERED:
			console.log("SET_REGISTERED", action.payload)
			return {
				...state,
				registered: action.payload,
			};
		default:
			return state;
	}
}
