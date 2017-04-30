import { MAP_CONTROLLER } from './actionTypes';
import WSService from '../services/WSService';

export function setPlaying(payload) {
	return {
		type: MAP_CONTROLLER.IS_PLAYING,
		payload,
	};
}

export function setStop(payload) {
	return {
		type: MAP_CONTROLLER.STOP_ENABLED,
		payload,
	};
}

export function setYear(payload) {
	return {
		type: MAP_CONTROLLER.SET_YEAR,
		payload,
	};
}

export function sendPlaying({ playing }) {
	return (dispatch) => {
		dispatch(setPlaying(playing));
		WSService.send('playing', { playing });
	};
}

export function sendStop({ stopEnabled }) {
	return (dispatch) => {
		dispatch(setStop(stopEnabled));
		WSService.send('stop', { stopEnabled });
	};
}
