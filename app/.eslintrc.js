module.exports = {
	root: true,
	parser: "babel-eslint",
	plugins: [ "react" ],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
	],

	env: {
		node: true,
		browser: true,
		es6: true,
	},

	globals: {

	},

	rules: {
		// Possible Errors
		"comma-dangle": [ 2, "always-multiline" ],
		"no-console": 1,
		"no-unexpected-multiline": 2,
		"valid-jsdoc": [ 2, {
			prefer: {
				returns: "return",
				requireReturn: "false",
			},
		} ],

		// Best Practices
		"consistent-return": 2,
		"curly": 2,
		"default-case": 2,
		"dot-location": [ 2, "property" ],
		"dot-notation": 2,
		"eqeqeq": 2,
		"no-alert": 2,
		"no-caller": 2,
		"no-extend-native": 2,
		"no-floating-decimal": 2,
		"no-native-reassign": 2,
		"no-new-wrappers": 2,
		"no-sequences": 2,
		"no-useless-concat": 2,
		"no-warning-comments": 1,
		"no-with": 2,
		"yoda": 2,

		// Variables
		"init-declarations": [ 2, "always" ],
		"no-shadow-restricted-names": 2,
		"no-unused-vars": [ 2, { vars: "all", args: "none" } ],

		// Node.js and CommonJS
		"callback-return": [2, [ "callback" ]],
		"handle-callback-err": [ 2, "^(err|error)$" ],
		"no-path-concat": 2,

		// Stylistic Issues
		"array-bracket-spacing": [ 2, "always" ],
		"block-spacing": 2,
		"brace-style": [ 2, "stroustrup" ],
		"comma-spacing": [ 2, {
			before: false,
			after: true,
		} ],
		"comma-style": [ 2, "last" ],
		"eol-last": 2,
		"indent": [ 2, "tab", { SwitchCase: 1 } ],
		"key-spacing": [ 2, { beforeColon: false, afterColon: true, mode: "minimum" } ],
		"lines-around-comment": [ 2, {
			beforeBlockComment: false,
			afterBlockComment: false,
			beforeLineComment: false,
			afterLineComment: false,

			allowBlockStart: true,
			allowBlockEnd: true,
			allowObjectStart: true,
			allowObjectEnd: true,
			allowArrayStart: true,
			allowArrayEnd: true,
		} ],
		"new-cap": [ 2, { capIsNewExceptions: [ "Debug" ] } ],
		"new-parens": 2,
		"no-array-constructor": 2,
		"no-bitwise": 2,
		"no-multiple-empty-lines": [ 2, { max: 1 } ],
		"no-negated-condition": 2,
		"no-nested-ternary": 0,
		"no-new-object": 2,
		"no-spaced-func": 2,
		"no-trailing-spaces": [ 2, { skipBlankLines: true } ],
		"no-unneeded-ternary": 2,
		"object-curly-spacing": [ 2, "always" ],
		"one-var": [ 2, "never" ],
		"operator-assignment": [ 2, "always" ],
		"operator-linebreak": [ 2, "before" ],
		"padded-blocks": [ 2, "never" ],
		"quote-props": [ 2, "consistent" ],
		"quotes": [ 2, "single", "avoid-escape" ],
		"semi-spacing": 2,
		"semi": [ 1, "always" ],
		"keyword-spacing": 2,
		"space-before-blocks": 2,
		"space-before-function-paren": [ 2, "never" ],
		"space-infix-ops": 2,
		"space-unary-ops": 2,
		"spaced-comment": [ 2, "always" ],

		// ECMAScript 6
		"no-redeclare": 0,
		"arrow-spacing": 2,
		"constructor-super": 2,
		"generator-star-spacing": [ 2, { before: true, after: true } ],
		"no-this-before-super": 2,
		"no-var": 2,
		"prefer-arrow-callback": 2,
		"prefer-template": 2,
	},
};
