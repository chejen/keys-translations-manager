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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'__DEV__': true,
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
				'CLIENT_SIDE': true
			}
		})
	],
	devtool: 'cheap-module-eval-source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			enforce: 'pre',
			exclude: path.resolve(__dirname, 'node_modules'),
			use: ['eslint-loader']
		}, {
			test: /\.jsx?$/,
			use: ['babel-loader'],
			include: dir.src
		}, {
			test: /\.(css|less)$/,
			use: [
				"style-loader",
				"css-loader",
				"less-loader"
			]
		}]
	}
};
