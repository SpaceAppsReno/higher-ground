const socket = new WebSocket('ws://localhost:3001');

socket.addEventListener('open', (event) => {
	socket.send(JSON.stringify({
		event: 'hello',
		data: {
			type: 'app',
		},
	}));
});

socket.addEventListener('message', (message) => {
	let { event, data } = JSON.parse(message.data);
	console.log(event, data);

	if (event === 'bar') {
		socket.send(JSON.stringify({
			event: 'foo',
			data: {
				foo: 'bar',
			},
		}));
	}
});
