let apps = {};

export default {
	register(app) {
		let key = Math.random().toString(36).slice(2, 6);
		apps[key] = app;

		return key;
	},
	attach(key, controller) {
		if (!apps[key]) {
			return {
				message: `App ${ key } does not exist.`,
			};
		}

		return apps[key].attach(controller);
	},
};
