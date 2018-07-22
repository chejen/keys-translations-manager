module.exports = {
	/**
	 * If you change the configurations,
	 * don't forget to rebuild the code (npm run build) and
	 * restart the server (npm run start).
	*/
	server: {
		protocol: 'http',
		hostname: 'localhost',
		port: 3000
	},
	locales: ['en-US', 'zh-TW'],
	projects: [ // make sure the ids are 'String' type
		{ id: 'p1', name: 'Project A' },
		{ id: 'p2', name: 'Project B' }
	],
	enableNotifications: true
};
