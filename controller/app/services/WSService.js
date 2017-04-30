import { setRegistered, setError } from '../actions/registrationActions';
import { setDataset, setPlaying, setYear, setRegion } from '../actions/mapControllerActions';
import store from '../store/configStore';
import autobind from 'autobind-decorator';
import { convertBoundsToRegion } from '../helpers/mapHelpers';

@autobind
class WSService {
	constructor() {
		this.ws = new WebSocket('wss://higher-ground-communication.herokuapp.com');
		// this.ws = new WebSocket('ws://localhost:3001');

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
					if (event.data.key) {
						store.dispatch(setRegistered({ registered: true }));
					} else {
						store.dispatch(setError({ error: event.data.message }));
					}
					// setTimeout(() => {
					// 	store.dispatch(setRegistered({ registered: false }));
					// }, 2000);
					break;
				case 'playing':
					store.dispatch(setPlaying(event.data));
					break;
				case 'year':
					store.dispatch(setYear(event.data));
					break;
				case 'dataset':
					store.dispatch(setDataset(event.data));
					break;
				case 'bounds':
					store.dispatch(setRegion({
						...event.data.bounds,
					}));
					break;
				case 'config':
					console.log("config", event.data)
					store.dispatch(setDataset(event.data.dataset));
					store.dispatch(setYear(event.data.year));
					store.dispatch(setRegion(convertBoundsToRegion({ ...event.data.bounds })));
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
			data,
		}));
	}

}

export default new WSService();
