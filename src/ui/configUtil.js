'use strict';
const config = require('../../ktm.config'),
	host = "http://" + config.server.hostname + ":" + config.server.port;
let projectIdList = [], projectNames = {};

config.projects.map(function(e) {
	projectIdList.push(e.id);
	projectNames[e.id] = e.name;
});

module.exports = {
	getHost() {
		return host;
	},
	getProjectIdList() {
		return projectIdList;
	},
	getProjectName(projectId) {
		return projectNames[projectId];
	}
}
