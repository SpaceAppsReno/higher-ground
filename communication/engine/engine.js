import Controller from './controller';
import App from './app';

export default (ws) => {
	let socket = null;

	ws.on('message', (message) => {
		let { event, data } = JSON.parse(message);

		if (event === 'hello') {
			if (data.type === 'controller') {
				if (socket) {
					if (!(socket instanceof Controller)) {
						socket.error('Controller already initialized.');
						return;
					}
				}
				else {
					socket = new Controller(ws);
				}
			}
			else if (data.type === 'app') {
				if (socket) {
					if (!(socket instanceof App)) {
						socket.error('App already initialized.');
						return;
					}
				}
				else {
					socket = new App(ws);
				}
			}
			else {
				ws.send(JSON.stringify({
					event: 'error',
					data: {
						message: `Invalid hello type: ${ data.type }`,
					},
				}));
			}
		}

		socket.receive(event, data);
	});
};
