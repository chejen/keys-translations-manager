var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackStrip = require('webpack-strip');
var dir = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'public', 'js')
};

var config = {
	mode: 'production',
	entry: {
		bundle: path.join(dir.src, 'client', 'index')
	},
	output: {
		path: dir.dist,
		filename: "[name].js",
		publicPath: '/public/js/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](react|react-dom|redux|redux-thunk|react-redux|react-router|react-router-dom|socket.io-client)[\\/]/,
					name: 'vendor',
					chunks: 'all',
				}
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin('./public/js'),
		new webpack.DefinePlugin({
			'__DEV__': false
		})
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: path.resolve(__dirname, 'node_modules'),
			use: ['babel-loader', WebpackStrip.loader('console.log', 'console.warn')]
		}, {
			test: /\.(css|less)$/,
			use: [
				"style-loader",
				"css-loader",
				"less-loader"
			]
		}/*, {
			test: /\.(png|jpg|gif|ttf|woff|woff2)$/,
			loader: 'url?limit=25000'
		}*/]
	}
};

module.exports = config;
