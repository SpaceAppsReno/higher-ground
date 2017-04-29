import Socket from './lib/socket';
import apps from './apps';

export default class Controller extends Socket {
	constructor(socket) {
		super(socket);

		this.on('hello', (data) => {
			this.emit('hello', apps.attach(data.app, this));
		});
	}
}
