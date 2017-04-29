import API from './api';
import Accomplishment from './accomplishment';

export default class Objective extends API {
	static prefix = `${ API.prefix }/Objective`;
	static _cache = {};

	get id() {
		return this._data.id;
	}

	get title() {
		return this._data.title || null;
	}

	get description() {
		return this._data.description || null;
	}

	get points() {
		return this._data.basePoints || 0;
	}

	get level() {
		return this._data.level || 0;
	}

	get location() {
		return this._data.location ? {
			lat: this._data.location.lat,
			lng: this._data.location.long,
		} : null;
	}

	getAccomplishments() {
		return Accomplishment.getByObjective({
			id: this.id,
		});
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			points: this.points,
			level: this.level,
			location: this.location,
		};
	}
}
