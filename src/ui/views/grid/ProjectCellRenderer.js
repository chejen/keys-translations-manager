import React from 'react'
import ConfigUtil from '../../../util/ConfigUtil'
export default class ProjectCellRenderer extends React.Component {
	static propTypes = {
		params: React.PropTypes.object
	}

	constructor(props) {
		super(props);
	}

	render() {
		const projectList = this.props.params.value,
				l = projectList ? projectList.length : 0,
				getProjectName = ConfigUtil.getProjectName;
		let i, project = [];
		for (i = 0; i < l; i++) {
			project.push( getProjectName(projectList[i]) );
		}
		return <div>{project.join(", ")}</div>
	}
}
