import { setRegistered, setError } from '../actions/registrationActions';
import MapController from '../actions/mapControllerActions';
import store from '../store/configStore';
import autobind from 'autobind-decorator';
import { convertBoundsToRegion } from '../helpers/mapHelpers';

@autobind
class WSService {
	constructor() {
		this.ws = new WebSocket('wss://higher-ground-communication.herokuapp.com');

		this.ws.onopen = (arg) => {
			// connection opened
			console.log("arg", arg)
			// this.ws.send('something'); // send a message
		};

		this.ws.onmessage = (e) => {
			// a message was received
			console.log("onmessage", e.data)
			const event = JSON.parse(e.data);
			switch (event.event) {
				case 'hello':
					store.dispatch(setRegistered({ registered: true }));
					// setTimeout(() => {
					// 	store.dispatch(setRegistered({ registered: false }));
					// }, 2000);
					break;
				case 'playing':
					store.dispatch(MapController.setPlaying(event.data));
					break;
				case 'year':
					store.dispatch(MapController.setYear(event.data));
					break;
				case 'dataset':
					store.dispatch(MapController.setDataset(event.data));
					break;
				case 'bounds':
					store.dispatch(MapController.setRegion({
						...event.data.bounds,
					}));
					break;
			}
		};

		this.ws.onerror = (e) => {
			// an error occurred
			console.log(e.message);
		};

		this.ws.onclose = this.logout;
	}

	register(app) {
		console.log("register")
		this.ws.send(JSON.stringify({
			event: 'hello',
			data: {
				type: 'controller',
				app,
			},
		}));
	}

	logout(e) {
		// connection closed
		console.log("onclose", e.code, e.reason);
		store.dispatch(setRegistered({ registered: false }));
	}

	send(event, data = {}) {
		console.log("send", event, data)
		this.ws.send(JSON.stringify({
			event,
			data: {
				...data,
				type: 'controller',
			},
		}));
	}

}

export default new WSService();
