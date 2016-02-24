import React from 'react'
import config from '../../../config'
export default class ProjectCellRenderer extends React.Component {
    constructor() {
        super();

        let projectMapping = {};
        config.projects.map(function(e){
            projectMapping[e.id] = e.name;
        });
        this.projectMapping = projectMapping;
    }

    render() {
        const projectList = this.props.params.value,
            l = projectList.length;
		let i,
			project = [];
		for (i = 0; i < l; i++) {
			project.push( this.projectMapping[projectList[i]] );
		}

        return <div>{project.join(", ")}</div>
    }
}

ProjectCellRenderer.propTypes = {
    params: React.PropTypes.object
};
