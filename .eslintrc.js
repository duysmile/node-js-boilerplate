module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
// module.exports = {
// 	'extends': 'airbnb-base',
// 	// add your environment below the extends key, like this:
// 	'env': {
// 		'node': true,
// 		'browser': true
// 	},
// 	'plugins': ['import'],
// 	'parserOptions': {
// 		'ecmaVersion': 6
// 	}
// };
