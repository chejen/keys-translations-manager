module.exports = {
	/**
	 * Rebuild the code (npm run build) if you change the configuration of 'locales' or 'projects'.
	 * Restart the server (npm run start:app) if you change any of these configurations.
	*/
	server: {
		hostname: 'localhost',
		port: 3000
	},
	database: 'mongodb://localhost:27017/translationdb',
	locales: ['en-US', 'zh-TW'],
	projects: [
		{id:'p1', name:'project A'},
		{id:'p2', name:'project B'}
	]
};
