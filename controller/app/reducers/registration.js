import { REGISTRATION } from '../actions/actionTypes';

const initialState = {
	code: '123',
	registered: false,
};

export default function registrationReducer(state = initialState, action = {}) {
	switch (action.type) {
		case REGISTRATION.UPDATE_CODE:
			return {
				...state,
				code: action.payload,
			};
		default:
			return state;
	}
}
