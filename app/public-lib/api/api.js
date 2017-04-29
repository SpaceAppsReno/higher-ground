import qs from 'querystring';
// import fetch from './_mock_fetch';

const uri = 'https://gamifyreno.azurewebsites.net';

export default class API {
	static prefix = '/api';

	static async request(method = 'GET', url, query, body, headers = {}) {
		method = method.toUpperCase();

		if (query && typeof query === 'object') {
			for (let key in query) {
				if (typeof query[key] === 'undefined') {
					delete query[key];
				}
			}

			if (Object.keys(query).length) {
				query = `?${ qs.stringify(query) }`;
			}
			else {
				query = null;
			}
		}

		if (typeof query !== 'string') {
			query = '';
		}

		if (this._cache) {
			if (!this._cache[method]) {
				this._cache[method] = {};
			}

			if (!this._cache[method][url]) {
				this._cache[method][url] = {};
			}

			if (this._cache[method][url][query]) {
				return this._cache[method][url][query];
			}
		}

		headers.Accept = 'application/json';
		if (typeof body !== 'undefined') {
			headers['Content-Type'] = 'application/json';
			body = JSON.stringify(body);
		}

		let result = await fetch(`${ uri }${ this.prefix }${ url }${ query }`, { method, headers, body })
			.then(async (response) => {
				if (response.status >= 300 || response.status < 100) {
					let error = new Error(response.statusText);
					error.response = await response.json();

					throw error;
				}

				return response.json();
			})
		;

		if (result && this._cache) {
			this._cache[method][url][query] = result;
		}

		return result;
	}

	static async get(id) {
		if (!id) {
			return null;
		}

		let result = await this.request('GET', 'ById', { id });

		return new this(result);
	}

	static async search(path = '', query = null) {
		let results = await this.request('GET', path, query);

		if (!Array.isArray(results)) {
			results = [];
		}

		return results.map(result => new this(result));
	}

	static getRecent() {
		return this.search('s');
	}

	constructor(data) {
		this._data = data;
	}
}
