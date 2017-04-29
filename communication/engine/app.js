import Socket from './lib/socket';
import apps from './apps';

export default class App extends Socket {
	constructor(socket) {
		super(socket);

		this._key = apps.register(this);

		this.on('hello', (data) => {
			this.emit('hello', {
				key: this._key,
			});
		});
	}

	attach(controller) {
		controller.on('*', (event, data) => this.emit(event, data));
		this.on('*', (event, data) => controller.emit(event, data));

		this.emit('controller');

		return {
			key: this._key,
		};
	}
}
