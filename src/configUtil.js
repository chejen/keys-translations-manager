'use strict';
const config = require('../ktm.config'),
	{ server, locales, projects } = config,
	host = `${server.protocol}://${server.hostname}${server.port ? ':' + server.port : ''}`;
let projectIdList = [],
	projectNames = {};

projects.map(function(e) {
	projectIdList.push(e.id);
	projectNames[e.id] = e.name;
});

module.exports = {
	getHost() {
		return host;
	},
	getLocales() {
		return locales;
	},
	getProjects() {
		return projects;
	},
	getProjectIdList() {
		return projectIdList;
	},
	getProjectName(projectId) {
		return projectNames[projectId];
	}
}
