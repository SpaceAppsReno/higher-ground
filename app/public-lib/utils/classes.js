export default function(...tokens) {
	return tokens
		.map((object) => {
			if (object && typeof object === 'object') {
				return Object
					.keys(object)
					.filter((token) => object[token]);
			}
			
			return object;
		})
		.reduce((tokens, input) => tokens.concat(input), [])
		.filter((token) => token && !!token.trim())
		.join(' ')
	;
}
