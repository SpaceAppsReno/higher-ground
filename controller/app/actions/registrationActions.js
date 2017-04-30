import { REGISTRATION } from './actionTypes';
import WSService from '../services/WSService';

export function updateCode(payload) {
	return {
		type: REGISTRATION.UPDATE_CODE,
		payload,
	};
}

export function register({ code }) {
	return (dispatch, getState) => {
		dispatch(updateCode(code));
		WSService.register(code);
	};
}

export function setError({ error }) {
	return {
		type: REGISTRATION.SET_ERROR,
		payload: error,
	};
}

export function setRegistered({ registered }) {
	return {
		type: REGISTRATION.SET_REGISTERED,
		payload: registered,
	};
}
