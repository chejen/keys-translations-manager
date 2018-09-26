'use strict';
const config = require('../ktm.config'),
	{ locales, projects } = config,
	projectIdList = [],
	projectNames = {};

projects.map(e => {
	projectIdList.push(e.id);
	projectNames[e.id] = e.name;
});

module.exports = {
	getHost() {
		if (process.env.NODE_ENV === 'test') {
			return `http://localhost:${process.env.PORT || 3000}`;
		}
		return '';
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
