var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var webpack = require('webpack');
var log = require('keys-translations-manager-core/lib/logUtil').log;
var config = require('./ktm.config');
var TranslationController = require('./src/api/controllers/TranslationController');
var CountController = require('./src/api/controllers/CountController');
var DownloadController = require('./src/api/controllers/DownloadController');
var app = express(),
	webpackConfig,
	compiler;

mongoose.connect(config.database, function(err) {
	if (err) {
		log('error', 'Failed to connect database');
		log('error', err);
		process.exit(1);
	//} else {
	//	console.log('Connect to database successfully.');
	}
});

app.listen(config.server.port, config.server.hostname, function(err) {
	if (err) {
		log('error', err);
		process.exit(1);
	}

	if (process.env.NODE_ENV === 'production') {
		log('info', 'The server (at http://localhost:3000) has started.');
	} else {
		log('info', 'Dev-server (at http://localhost:3000) is starting, please wait ...');
	}
});


if (process.env.NODE_ENV === 'production') {
	app.use('/public', express.static(path.join(__dirname, 'public')));
} else {
	webpackConfig = require('./webpack.config.dev');
	compiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		/*stats: {
			colors: true
		},*/
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	})).use(require('webpack-hot-middleware')(compiler));
	app.use('/public/locale', express.static(path.join(__dirname, 'public/locale')));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/translation", TranslationController);
app.use("/api/count", CountController);
app.use("/api/download", DownloadController);
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});
