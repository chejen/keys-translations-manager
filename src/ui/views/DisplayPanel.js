import '../app.less';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Counter from './Counter'
import TranslationTable from './TranslationTable'

const DisplayPanel = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState() {
		return {
			fileType: "j"
		};
	},

	download(project) {
		const config = this.props.config
		let url = "http://" + config.server.hostname + ":" + config.server.port + "/api/download/"

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
	},

	setFileType(fileType) {
		this.setState({
			fileType: fileType
		});
	},

	render() {
		const me = this
		const config = this.props.config
		const projectCount = this.props.count.projects

		return(
			<div>
				<div className="app-download-panel">
					{config.projects.map(function(e){
						return (
							<Counter onClick={me.download.bind(me, e)} name={e.name} key={e.id}
									count={projectCount ? (projectCount[e.id] || 0) : 0} />
						);
					})}

					<input type="radio" name="fileType" value="j" checked={this.state.fileType==="j"}
						onChange={this.setFileType.bind(this, "j")}/> JSON (minimized)&nbsp;&nbsp;&nbsp;
					<input type="radio" name="fileType" value="jf" checked={this.state.fileType==="jf"}
						onChange={this.setFileType.bind(this, "jf")}/> JSON (formatted)&nbsp;&nbsp;&nbsp;
					<input type="radio" name="fileType" value="p" checked={this.state.fileType==="p"}
						onChange={this.setFileType.bind(this, "p")}/> Properties
				</div>

				<TranslationTable {...this.props} config={config}/>
			</div>
		);
	}
})

module.exports = DisplayPanel
