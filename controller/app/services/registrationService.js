import { setRegistered, setError } from '../actions/registrationActions';
import store from '../store/configStore';

class RegWS {
	constructor() {
		this.ws = new WebSocket('ws://localhost:3001');

		this.ws.onopen = (arg) => {
			// connection opened
			console.log("arg", arg)
			// this.ws.send('something'); // send a message
		};

		this.ws.onmessage = (e) => {
			// a message was received
			const event = JSON.parse(e.data);
			switch (event.event) {
				case 'hello':
					store.dispatch(setRegistered({ registered: true }));
					break;
			}
		};

		this.ws.onerror = (e) => {
			// an error occurred
			console.log(e.message);
		};

		this.ws.onclose = (e) => {
			// connection closed
			console.log("onclose", e.code, e.reason);
		};
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

}

export default new RegWS();
