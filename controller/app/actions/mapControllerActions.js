import { MAP_CONTROLLER } from './actionTypes';
import WSService from '../services/WSService';
import { convertRegionToBounds } from '../helpers/mapHelpers';

export function setDataset(payload) {
	return {
		type: MAP_CONTROLLER.DATASET,
		payload,
	};
}

export function setPlaying(payload) {
	return {
		type: MAP_CONTROLLER.IS_PLAYING,
		payload,
	};
}

export function setRegion(payload) {
	return {
		type: MAP_CONTROLLER.SET_REGION,
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

export function sendDataset({ dataset }) {
	return (dispatch) => {
		dispatch(setDataset(dataset));
		WSService.send('dataset', { dataset });
	};
}

export function sendRegion(region) {

	return () => {
		WSService.send('bounds', {
			data: convertRegionToBounds(region),
		});
	}
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
