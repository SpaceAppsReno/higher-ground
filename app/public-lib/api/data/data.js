import qs from 'querystring';

const uri = 'http://10.150.145.62:8080';

export default class API {
	static _cache = {};

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

		let result = await fetch(`${ uri }${ url }${ query }`, { method, headers, body })
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

	static async getPoints({ dataset, year, bounds }) {
		return this.request('GET', '/heat', {
			dataset,
			year,
			bounds_east: bounds.east,
			bounds_north: bounds.north,
			bounds_south: bounds.south,
			bounds_west: bounds.west,
		});
	}
}

if (false) {
	API.getPoints = function() {
		return Promise.resolve({
			lons: [
				-121.25,
				-118.75,
			],
			lats: [
				36.5056190490723,
				38.5280914306641,
				40.5505599975586,
				42.5730323791504,
			],
			data: [
				[ 5.502, 5.470 ],
				[ 4.394, 3.252 ],
				[ 3.109, 3.971 ],
				[ 0.395, 2.233 ],
			],
		});
	};
}
