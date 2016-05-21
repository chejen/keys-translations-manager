import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Dropzone from 'react-dropzone'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
import Modal from 'react-bootstrap/lib/Modal'
// import FormPanel from './FormPanel'
// import AlertPanel from './AlertPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class ImportModal extends React.Component {
	static propTypes = {
		showimportmodal: React.PropTypes.bool.isRequired,
		closeImportModal: React.PropTypes.func.isRequired
		// data: React.PropTypes.object.isRequired,
		// errors: React.PropTypes.array.isRequired,
		// updateTranslation: React.PropTypes.func.isRequired,
		// alertErrors: React.PropTypes.func.isRequired,
		// clearErrors: React.PropTypes.func.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedFile: null,
			selectedLocale: null,
			selectedProject: null
		}
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	setLocale(locale) {
		this.setState({
			selectedLocale: locale
		})
	}

	setProject(project) {
		this.setState({
			selectedProject: project
		})
	}

	onDrop(files) {
		console.log(files);
		this.setState({
			selectedFile: files[0]
		})
	}

	submit() {
		const data = {
			file: this.state.selectedFile,
			locale: this.state.selectedLocale,
			project: this.state.selectedProject
		}
		console.log("submit", data);
		//this.props.importLocale(data)
	}

	close() {
		this.props.closeImportModal()
	}

	render() {
		//const { data, errors, clearErrors } = this.props;
		const me = this,
			config = this.context.config;
			//locales = config.locales;


		return (
			<Modal show={this.props.showimportmodal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						{localeUtil.getMsg("ui.common.import")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ControlLabel>
						<span className="app-input-asterisk">* </span>
						<span style={{marginRight: 20}}>{localeUtil.getMsg("ui.common.file")}:</span>
					</ControlLabel>
					<Dropzone accept=".json,.properties"
							className="app-dropzone"
							multiple={false} disablePreview
							onDrop={this.onDrop.bind(this)}>
						{this.state.selectedFile
							? "The file to import: " + this.state.selectedFile.name
							: "Drop your locale file here, or click to select a file to import."
						}
					</Dropzone>

					<div style={{marginTop: "5px 0"}}>
						<ControlLabel>
							<span className="app-input-asterisk">* </span>
							<span style={{marginRight: 20}}>{localeUtil.getMsg("ui.common.locale")}:</span>
						</ControlLabel>
						{config.locales.map(function(e){
							return (
								<Radio inline key={e} name="locale" value={e}
									checked={me.state.selectedLocale===e}
									onChange={me.setLocale.bind(me, e)}>{e}</Radio>
							);
						})}
					</div>

					<div style={{margin: "5px 0"}}>
						<ControlLabel>
							<span className="app-input-asterisk">* </span>
							<span style={{marginRight: 20}}>{localeUtil.getMsg("ui.common.applyto")}:</span>
						</ControlLabel>
						{config.projects.map(function(e){
							let {id, name} = e
							return (
								<Radio inline key={id} name="project" value={id}
									checked={me.state.selectedProject===id}
									onChange={me.setProject.bind(me, id)}>{name}</Radio>
							);
						})}
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={this.submit.bind(this)}>
						{localeUtil.getMsg("ui.common.import")}
					</Button>
					<Button bsSize="small" onClick={this.close.bind(this)}>
						{localeUtil.getMsg("ui.common.cancel")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
