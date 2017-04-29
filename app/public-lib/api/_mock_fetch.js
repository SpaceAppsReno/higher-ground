export default async function mock_fetch(path, config) {
	let data = getData(path);

	return {
		status: 200,
		json: async () => {
			return data;
		},
	};
}

function getData(path) {
	let match = null;

	match = path.match(/^https?:\/\/[^\/]+\/api\/AccomplishmentById\?id=(.*)$/);
	if (match) {
		return {
			accomplishmentID: match[1],
			objectiveID: match[1],
			userID: match[1],
			points: 10,
			proof: '## Hello World',
			timestamp: new Date().toJSON(),
		};
	}

	match = path.match(/^https?:\/\/[^\/]+\/api\/Accomplishment/);
	if (match) {
		return [ 'foo1', 'foo2', 'foo3' ].map((id) => ({
			accomplishmentID: id,
			objectiveID: id,
			userID: id,
			points: 10,
			proof: '## Hello World',
			timestamp: new Date().toJSON(),
		}));
	}

	match = path.match(/^https?:\/\/[^\/]+\/api\/ObjectiveById\?id=(.*)$/);
	if (match) {
		return {
			objectiveID: match[1],
			title: 'Foo Bar',
			description: '## Foo Bar',
			basePoints: 10,
			level: 2,
			location: {
				lat: 39.5252966,
				long: -119.8166583,
			},
		};
	}

	match = path.match(/^https?:\/\/[^\/]+\/api\/Objective/);
	if (match) {
		return [ 'foo1', 'foo2', 'foo3' ].map((id) => ({
			objectiveID: id,
			title: 'Foo Bar',
			description: '## Foo Bar',
			basePoints: 10,
			level: 2,
			location: {
				lat: 39.5252966,
				long: -119.8166583,
			},
		}));
	}

	match = path.match(/^https?:\/\/[^\/]+\/api\/UserById\?id=(.*)$/);
	if (match) {
		return {
			userID: match[1],
			userPicture: `https://github.com/identicons/${ match[1] }.png`,
			userRating: 1000,
			userLevel: 2,
		};
	}

	match = path.match(/^https?:\/\/[^\/]+\/api\/User/);
	if (match) {
		return [ 'foo1', 'foo2', 'foo3' ].map((id) => ({
			userID: id,
			userPicture: `https://github.com/identicons/${ id }.png`,
			userRating: 1000,
			userLevel: 2,
		}));
	}

	throw new Error(`Invalid mock URL: ${ path }`);
}
