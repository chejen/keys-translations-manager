import React from 'react'
import PropTypes from 'prop-types'
import Well from 'react-bootstrap/lib/Well'
import Row from 'react-bootstrap/lib/Row'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'
import CountCol from './CountCol'
import FileTypeCol from './FileTypeCol'

export default class OutputPanel extends React.PureComponent {
	static propTypes = {
		projectCounts: PropTypes.object.isRequired
	};

	constructor() {
		super();
		this.state = {
			fileType: "nj"
		};
	}

	setFileType(fileType) {
		this.setState({
			fileType: fileType
		});
	}

	download(project) {
		let url = configUtil.getHost() + '/api/download/'

		/* istanbul ignore next */
		if (this.state.fileType === 'njf' || this.state.fileType === 'fjf') {
			url += 'f/';
		} else {
			url += 'n/';
		}

		/* istanbul ignore next */
		if (this.state.fileType === 'p') {
			url += 'properties/';
		} else if (this.state.fileType === 'fj' || this.state.fileType === 'fjf') {
			url += 'flat/';
		} else {
			url += 'json/';
		}

		/* istanbul ignore next */
		location.href = url + project.id;
	}

	render() {
		const me = this
		const { projectCounts } = this.props
		const fileTypeList = [{
			value: "nj", label: `nested JSON (${localeUtil.getMsg("ui.json.mini")})`
		}, {
			value: "njf", label: `nested JSON (${localeUtil.getMsg("ui.json.format")})`
		}, {
			value: "fj", label: `flat JSON (${localeUtil.getMsg("ui.json.mini")})`
		}, {
			value: "fjf", label: `flat JSON (${localeUtil.getMsg("ui.json.format")})`
		}, {
			value: "p", label: "Properties"
		}]

		return(
			<Well>
				<Row>
					{fileTypeList.map(e => (
						<FileTypeCol key={e.value} value={e.value} label={e.label}
							fileType={me.state.fileType}
							onChange={me.setFileType.bind(me, e.value)} />
					))}
				</Row>
				<Row>
					{configUtil.getProjects().map(e => (
						<CountCol key={e.id}
							onClick={me.download.bind(me, e)}
							header={e.name} projectId={e.id}
							desc={(projectCounts && projectCounts[e.id] === 1) ? "key" : "keys"}
							count={projectCounts ? (projectCounts[e.id] || 0) : 0}
						/>
					))}
				</Row>
			</Well>
		);
	}
}
