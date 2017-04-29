const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

function addPolyfill(input) {
	if (typeof input === 'string') {
		return [ 'babel-polyfill', input ];
	}

	if (input.constructor === Array) {
		return [ 'babel-polyfill' ].concat(input);
	}

	let output = {};

	for (let key in input) {
		output[key] = addPolyfill(input[key]);
	}

	return output;
}

module.exports = function(dirname, options) {
	options.title = options.title || 'Gamify Reno';
	options.resolve_alias = options.resolve_alias || {};

	options.entry = options.entry || './public-src/bootstrap.js';
	options.resolve_alias.global = path.join(dirname, 'public-src', 'global');

	if (options.polyfill) {
		options.entry = addPolyfill(options.entry);
	}

	try {
		let location = path.join(dirname, 'public-lib');
		let libs = fs.readdirSync(location);
		for (let lib of libs) {
			let location_lib = path.join(location, lib);
			options.resolve_alias[`app-${ lib }`] = location_lib;
		}
	}
	catch (e) {
		// do nothing
	}

	let pathAll = new RegExp(path.resolve(dirname, 'public-(src|lib)').replace(/\\/g, '\\\\'));
	let pathGlobal = new RegExp(path.resolve(dirname, 'public-src/global').replace(/\\/g, '\\\\'));
	// `.replace(/\\/g, '\\\\')` because windows...

	return {
		devtool: 'eval',

		entry: options.entry,
		output: {
			filename: '[name].[hash].min.js',
			path: path.resolve(dirname, 'public'),
			publicPath: '/',
		},

		resolve: {
			alias: options.resolve_alias,
		},

		module: {
			rules: [
				{
					test: /\.(webm|woff|woff2|ttf|eot|jpg|png|gif|svg)(\?.*)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'assets/[hash].[ext]',
							},
						},
					],
				},
				{
					test: /\.js$/,
					include: pathAll,
					use: [
						'babel-loader',
					],
				},

				{
					test: /\.s?css$/,
					include: pathAll,
					exclude: pathGlobal,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									sourceMap: true,
									sourceMapContents: true,
								},
							},
						],
					}),
				},
				{
					test: /\.s?css$/,
					include: pathGlobal,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: false,
									sourceMap: true,
									sourceMapContents: true,
								},
							},
						],
					}),
				},
				{
					test: /\.scss$/,
					include: pathAll,
					use: [
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								sourceMapContents: true,
							},
						},
						{
							loader: 'sass-resources-loader',
							options: {
								resources: path.resolve(dirname, './public-src/global/resources.scss'),
							},
						},
					],
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('[name].[hash].min.css'),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				sourceMapContents: true,
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			new HtmlWebpackPlugin({
				title: options.title,
				filename: 'index.html',
				minify: {
					collapseWhitespace: !options.dev,
				},
				template: path.join(__dirname, 'template.ejs'),
			}),
		],
	};
};
