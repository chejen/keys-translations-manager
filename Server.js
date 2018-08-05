import bodyParser from 'body-parser'
import express from 'express'
import favicon from 'serve-favicon'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import compression from 'compression'
import logUtil from 'keys-translations-manager-core/lib/logUtil'
import database from './db.config'
import config from './ktm.config'
import { LANGUAGES } from './src/constants/Languages'
import TranslationController from './src/controllers/TranslationController'
import HistoryController from './src/controllers/HistoryController'
import KeyController from './src/controllers/KeyController'
import CountController from './src/controllers/CountController'
import DownloadController from './src/controllers/DownloadController'
import ImportController from './src/controllers/ImportController'
import VisController from './src/controllers/VisController'

const log = logUtil.log,
	port = process.env.PORT || 3000,
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server);
let webpackConfig,
	compiler;

mongoose.Promise = global.Promise; //mpromise (mongoose's default promise library) is deprecated
mongoose.connect(process.env.DB || database, {
	useNewUrlParser: true,
	socketTimeoutMS: 90000,
	connectTimeoutMS: 90000
}).then(
	() => {
		// console.log('Connect to database successfully.');
	},
	err => {
		log('error', 'Failed to connect database');
		log('error', err);
		process.exit(1);
	}
);

server.listen(port, err => {
	if (err) {
		log('error', err);
		process.exit(1);
	}

	if (process.env.NODE_ENV === 'development') {
		log('info', `Dev-server (at http://localhost:${port}) is starting, please wait ...`);
	} else {
		log('info', 'The server has started.');
	}
});
if (config.enableNotifications) {
	io.on('connection', socket => {
		socket.on('ktm', data => {
			if (data && data.action === "datachanged") {
				// sending to all clients except sender
				socket.broadcast.emit('ktm', {action: "datachanged"});
			}
		});
	});
}

app.set('view engine', 'ejs');
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'image', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

if (process.env.NODE_ENV === 'development') {
	webpackConfig = require('./webpack.config.dev');
	compiler = require('webpack')(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		/*stats: {
			colors: true
		},*/
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	})).use(require('webpack-hot-middleware')(compiler));
	app.get(['/', '/vis/*'], (req, res) => {
		const markup = ['<div style="color:orange;text-align:center">',
							'<i class="fas fa-spinner fa-spin fa-2x"></i>',
						'</div>'].join("")
		const css = ''
		const vendor = ''
		const initialState = ''
		res.render('index', { initialState, markup, css, vendor })
	});
} else {
	app.get(['/', '/vis/*'], (req, res) => {
	//app.use((req, res) => {
		const markup = require('./src/server/index').default
		const css = '<link rel="stylesheet" href="/public/css/app.css">'
		const vendor = '<script src="/public/js/vendor.js"></script>'
		const context = {}
		let lang = req.headers["accept-language"].split(",")[0]
		lang = (LANGUAGES.indexOf(lang) === -1) ? "en-US" : lang

		if (context.url) {
			res.writeHead(301, {
				Location: context.url
			})
			res.end()
		} else {
			fs.readFile('./public/locale/' + lang + '/translation.json', {encoding: 'utf-8'}, (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					const messages = JSON.parse(data)
					const preloadedState = {
						messages: { lang, messages }
					}
					const initialState = `
						<script>
							window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
						</script>
					`

					res.render('index', {
						initialState,
						markup: markup(preloadedState, req, context),
						css,
						vendor
					})
				}
			});
		}
	});
}

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api/translation", TranslationController);
app.use("/api/history", HistoryController);
app.use("/api/key", KeyController);
app.use("/api/count", CountController);
app.use("/api/download", DownloadController);
app.use("/api/import", ImportController);
app.use("/api/vis", VisController);
