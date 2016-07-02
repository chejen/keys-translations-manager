var path = require('path');
var webpack = require('webpack');
var dir = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'public', 'js')
};

module.exports = {
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		path.join(dir.src, 'client', 'index')
	],
	output: {
		path: dir.dist,
		filename: 'bundle.js',
		publicPath: '/public/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
				'CLIENT_SIDE': true
			}
		})
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
		}, {
			test: /\.(css|less)$/,
			loader: 'style!css!less'
		}]
	}
};
