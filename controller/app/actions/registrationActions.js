import { REGISTRATION } from './actionTypes';
import RegistrationService from '../services/registrationService';

export function updateCode(payload) {
	return {
		type: REGISTRATION.UPDATE_CODE,
		payload,
	};
}

export function register({ code }) {
	return (dispatch, getState) => {
		dispatch(updateCode(code));
		RegistrationService.register(code);
		console.log("getState", getState(), code)
	};
}
