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
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				'CLIENT_SIDE': true
			}
		})
	],
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loaders: ['babel', WebpackStrip.loader('console.log', 'console.warn')]
		}/*, {
			test: /\.(css|less)$/,
			loader: 'style!css!less'
		}, {
			test: /\.(png|jpg|gif|ttf|woff|woff2)$/,
			loader: 'url?limit=25000'
		}*/]
	}
};

module.exports = config;
