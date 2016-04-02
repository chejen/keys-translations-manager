var path = require('path');
var webpack = require('webpack');
var dir = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'public', 'js')
};

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		path.join(dir.src, 'ui', 'index')
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
	devtool: 'cheap-module-eval-source-map',
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			exclude: path.resolve(__dirname, 'node_modules'),
			loaders: ['eslint-loader']
		}],
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel'],
			include: dir.src
		}/*, {
			test: /\.(css|less)$/,
			loader: 'style!css!less'
		}*/]
	}
};
