const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = function(dirname, options) {
	return {
		entry: {
			app: './public-src/bootstrap.js',
		},
		output: {
			filename: '[name].[hash].min.js',
			path: path.resolve(dirname, 'public'),
		},
		devServer: {
			contentBase: path.resolve(__dirname, 'public'),
		},

		resolve: {
			modules: [ 'node_modules' ],
		},

		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
								},
							},
						],
					}),
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
								},
							},
							'sass-loader',
						],
					}),
				},
				{
					test: /\.js$/,
					include: [
						path.resolve(dirname, 'public-src'),
					],
					use: [
						'babel-loader',
					],
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('[name].[hash].min.css'),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
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
