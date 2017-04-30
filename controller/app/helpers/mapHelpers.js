export function convertRegionToBounds(region) {
	const {
		latitude: centerLat,
		longitude: centerLong,
		latitudeDelta,
		longitudeDelta,
	} = region;

	return {
		north: centerLat + latitudeDelta,
		south: centerLat - latitudeDelta,
		west: centerLong - longitudeDelta,
		east: centerLong + longitudeDelta,
	};
}

export function convertBoundsToRegion(bounds) {
	const {
		north,
		south,
		east,
		west,
	} = bounds;

	const latitude = (north - south) / 2;
	const longitude = (east - west) / 2;
	const latitudeDelta = Math.abs(north - latitude);
	const longitudeDelta = Math.abs(east - longitude);
	return {
		latitude,
		longitude,
		latitudeDelta,
		longitudeDelta,
	};
}
