const socket = new WebSocket('ws://localhost:3001');

socket.addEventListener('open', (event) => {
	socket.send(JSON.stringify({
		event: 'hello',
		data: {
			type: 'controller',
			app: '0000',
		},
	}));
});

socket.addEventListener('message', (message) => {
	let { event, data } = JSON.parse(message.data);
	console.log(event, data);

	if (event === 'hello') {
		socket.send(JSON.stringify({
			event: 'bar',
			data: {
				bar: 'foo',
			},
		}));
	}
});
