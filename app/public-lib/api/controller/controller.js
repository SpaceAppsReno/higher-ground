const uri = 'wss://higher-ground-communication.herokuapp.com';

export default class Controller {
	constructor() {
		this._listeners = {};

		this._socket = new WebSocket(uri);
		this._socket.addEventListener('open', (event) => {
			this.emit('hello', {
				type: 'app',
			});
		});

		this._socket.addEventListener('message', (message) => {
			let { event, data } = JSON.parse(message.data);

			if (this._listeners[event]) {
				this._listeners[event].map(listener => listener(data));
			}
		});
	}

	emit(event, data) {
		this._socket.send(JSON.stringify({ event, data }));
	}

	on(event, listener) {
		if (!this._listeners[event]) {
			this._listeners[event] = [];
		}

		this._listeners[event].push(listener);
	}
}
