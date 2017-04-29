export default class RegWS {
	constructor() {
		this.ws = new WebSocket('ws://localhost:3001');

		this.ws.onopen = (arg) => {
			// connection opened
			console.log("arg", arg)
			ws.send('something'); // send a message
		};

		this.ws.onmessage = (e) => {
			// a message was received
			console.log(e.data);
		};

		this.ws.onerror = (e) => {
			// an error occurred
			console.log(e.message);
		};

		this.ws.onclose = (e) => {
			// connection closed
			console.log(e.code, e.reason);
		};
	}

	register(code) {
		this.ws.send({
			event: 'hello',
			data: {
				code,
			},
		});
	}

}
