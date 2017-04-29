export default class Socket {
	constructor(socket) {
		this._socket = socket;
		this._handlers = {};
	}

	on(event, handler) {
		if (!this._handlers[event]) {
			this._handlers[event] = [];
		}

		this._handlers[event].push(handler);
	}

	receive(event, data) {
		if (this._handlers['*']) {
			this._handlers['*'].map(handler => handler(event, data));
		}

		if (this._handlers[event]) {
			this._handlers[event].map(handler => handler(data));
		}
	}

	emit(event, data) {
		this._socket.send(JSON.stringify({ event, data }));
	}

	error(message) {
		this.emit('error', { message });
	}
}
