import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Well from 'react-bootstrap/lib/Well'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'
import CountCol from './CountCol'

export default class OutputPanel extends React.Component {
	static propTypes = {
		projectCounts: React.PropTypes.object.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor() {
		super();
		this.state = {
			fileType: "j"
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	setFileType(fileType) {
		this.setState({
			fileType: fileType
		});
	}

	download(project) {
		let url = configUtil.getHost() + "/api/download/"

		if (this.state.fileType === 'jf') {
			url += "f/";
		} else {
			url += "n/";
		}
		if (this.state.fileType === 'p') {
			url += "properties/";
		} else {
			url += "json/";
		}

		location.href = url + project.id;
	}

	render() {
		const me = this
		const config = this.context.config
		const {projectCounts} = this.props

		return(
			<Well>
				<Row>
					{config.projects.map(function(e){
						return (
							<CountCol onClick={me.download.bind(me, e)} header={e.name} key={e.id}
									count={projectCounts ? (projectCounts[e.id] || 0) : 0} desc="keys"/>
						);
					})}
				</Row>
				<Row>
					<Col>
						&nbsp;&nbsp;&nbsp;
						<input type="radio" name="fileType" value="j" checked={this.state.fileType==="j"}
							onChange={this.setFileType.bind(this, "j")}/> JSON ({localeUtil.getMsg("ui.json.mini")})
						&nbsp;&nbsp;&nbsp;
						<input type="radio" name="fileType" value="jf" checked={this.state.fileType==="jf"}
							onChange={this.setFileType.bind(this, "jf")}/> JSON ({localeUtil.getMsg("ui.json.format")})
						&nbsp;&nbsp;&nbsp;
						<input type="radio" name="fileType" value="p" checked={this.state.fileType==="p"}
							onChange={this.setFileType.bind(this, "p")}/> Properties
					</Col>
				</Row>
			</Well>
		);
	}
}
