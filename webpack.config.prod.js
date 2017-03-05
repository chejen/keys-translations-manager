var path = require('path');
var webpack = require('webpack');
var WebpackStrip = require('webpack-strip');
var dir = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'public', 'js')
};

var config = {
	entry: {
		bundle: path.join(dir.src, 'client', 'index')
	},
	output: {
		path: dir.dist,
		filename: "[name].js",
		publicPath: '/public/js/'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.DefinePlugin({
			'__DEV__': false,
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				'CLIENT_SIDE': true,
				'CODE_SPLITTING': true
			}
		})
	],
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: ['babel-loader', WebpackStrip.loader('console.log', 'console.warn')]
		}/*, {
			test: /\.(css|less)$/,
			use: [
				"style-loader",
				"css-loader",
				"less-loader"
			]
		}, {
			test: /\.(png|jpg|gif|ttf|woff|woff2)$/,
			loader: 'url?limit=25000'
		}*/]
	}
};

module.exports = config;
