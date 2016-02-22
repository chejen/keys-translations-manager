var path = require('path');
var webpack = require('webpack');
var dir = {
	src: path.join(__dirname, 'src', 'ui'),
	dist: path.join(__dirname, 'public', 'js')
};

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		dir.src + '/index'
	],
	output: {
		path: dir.dist,
		filename: 'bundle.js',
		publicPath: '/public/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			/*include: [
				path.resolve(__dirname, dir.app),
				path.resolve(__dirname, dir.common, "modules")
			],*/
			exclude: path.resolve(__dirname, 'node_modules'),
			loaders: ['eslint-loader']
		}],
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
			include: dir.src
		}, {
			test: /\.(css|less)$/,
			loader: 'style!css!less'
		}]
	}
};
