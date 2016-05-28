import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Dropzone from 'react-dropzone'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
import Modal from 'react-bootstrap/lib/Modal'
import AlertPanel from '../input/AlertPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class ImportModal extends React.Component {
	static propTypes = {
		showimportmodal: React.PropTypes.bool.isRequired,
		closeImportModal: React.PropTypes.func.isRequired,
		errors: React.PropTypes.array.isRequired,
		importLocale: React.PropTypes.func.isRequired,
		alertErrors: React.PropTypes.func.isRequired,
		clearErrors: React.PropTypes.func.isRequired
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.showimportmodal && !this.props.showimportmodal) {
			this.setState({
				selectedFile: null,
				selectedLocale: null,
				selectedProject: null
			});
		}
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
		const re = /\.(json|properties)$/,
			file = files[0];
		if ( re.test(file.name) ) {
			this.setState({
				selectedFile: file
			})
		} else {
			this.props.alertErrors([{
				type: 'accept',
				action: "i",
				params: file,
				match: ["*.json", "*.properties"]
			}]);
		}
	}

	submit() {
		const data = {
			file: this.state.selectedFile,
			locale: this.state.selectedLocale,
			applyto: this.state.selectedProject
		};
		let key,
			emptyFields = [];

		for (key in data) {
			if ({}.hasOwnProperty.call(data, key)) {
				if ( !data[key] ) {
					emptyFields.push(localeUtil.getMsg("ui.common." + key))
				}
			}
		}

		if ( emptyFields.length > 0 ) {
			this.props.alertErrors([{
				type: 'emptyfield',
				action: "i",
				params: data,
				match: emptyFields
			}]);
		} else {
			this.props.importLocale(data)
		}
	}

	close() {
		this.props.closeImportModal()
	}

	render() {
		const me = this,
			{ errors, clearErrors } = this.props,
			config = this.context.config;

		return (
			<Modal show={this.props.showimportmodal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						{localeUtil.getMsg("ui.common.import")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AlertPanel errors={errors} clearErrors={clearErrors} action="i"/>
					<ControlLabel>
						<span className="app-input-asterisk">* </span>
						<span>{localeUtil.getMsg("ui.common.file")}:</span>
					</ControlLabel>
					<Dropzone accept=".json,.properties"
							className="app-dropzone"
							multiple={false} disablePreview
							onDrop={this.onDrop.bind(this)}>

						{this.state.selectedFile
							? (<span>
								<span>{localeUtil.getMsg("ui.file.selected")} </span>
								<span style={{color:"#F92672"}}>{this.state.selectedFile.name}</span>
							</span>)
							: (<ul>
								<li>{localeUtil.getMsg("ui.file.select")}</li>
								<li>{localeUtil.getMsg("ui.file.accept")}</li>
							</ul>)
						}
					</Dropzone>

					<div className="app-radio-group">
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

					<div className="app-radio-group">
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
