import API from './api';
import Accomplishment from './accomplishment';
import md5 from 'md5';

export default class User extends API {
	static prefix = `${ API.prefix }/User`;
	static _cache = {};

	get id() {
		return this._data.userID;
	}

	get avatar() {
		return this._data.userPicture || `https://www.gravatar.com/avatar/${ md5(this.id) }?d=identicon&s=250`;
	}

	get points() {
		return this._data.userRating || 0;
	}

	get level() {
		return this._data.userLevel || Math.floor(Math.log(this.points / 5) / Math.log(10000 / 5) * 10);
	}

	getAccomplishments() {
		return Accomplishment.getByUser({
			id: this.id,
		});
	}

	toJSON() {
		return {
			id: this.id,
			avatar: this.avatar,
			points: this.points,
			level: this.level,
		};
	}
}
