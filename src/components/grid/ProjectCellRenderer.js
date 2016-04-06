import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import configUtil from '../../configUtil'
export default class ProjectCellRenderer extends React.Component {
	static propTypes = {
		params: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		const projectList = this.props.params.value,
				l = projectList ? projectList.length : 0,
				getProjectName = configUtil.getProjectName;
		let i, project = [];
		for (i = 0; i < l; i++) {
			project.push( getProjectName(projectList[i]) );
		}
		return <div>{project.join(", ")}</div>
	}
}
