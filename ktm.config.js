module.exports = {
	/**
	 * If you change the configurations,
	 * don't forget to rebuild the code (npm run build) and
	 * restart the server (npm run start).
	*/
	server: {
		hostname: 'localhost',
		port: 3000
	},
	database: 'mongodb://localhost:27017/translationdb',
	locales: ['en-US', 'zh-TW'],
	projects: [ // make sure the ids are 'String' type
		{id:'p1', name:'Project A'},
		{id:'p2', name:'Project B'}
	],
	enableNotifications: true
};
