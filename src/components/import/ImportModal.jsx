import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Button from 'react-bootstrap/lib/Button'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
import Modal from 'react-bootstrap/lib/Modal'
import AlertPanel from '../input/AlertPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'

const locales = configUtil.getLocales()
const projects = configUtil.getProjects()

export default class ImportModal extends React.PureComponent {
	static propTypes = {
		showimportmodal: PropTypes.bool.isRequired,
		closeImportModal: PropTypes.func.isRequired,
		errors: PropTypes.array.isRequired,
		importLocale: PropTypes.func.isRequired,
		alertErrors: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.close = this.close.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			pervShowimportmodal: false,
			selectedFile: null,
			selectedLocale: null,
			selectedProject: null
		}
		this.acceptTypes = ["json", "properties"];
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.showimportmodal && !prevState.pervShowimportmodal) {
			return {
				pervShowimportmodal: true,
				selectedFile: null,
				selectedLocale: null,
				selectedProject: null
			};
		}
		if (!nextProps.showimportmodal && prevState.pervShowimportmodal) {
			return {
				pervShowimportmodal: false,
			}
		}
		return null;
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

	onDrop /* istanbul ignore next */ (appected, rejected) {
		const re = new RegExp("\\.(" + this.acceptTypes.join("|") + ")"),
			file = appected.length ? appected[0] : rejected[0],
			me = this;
		if ( re.test(file.name) ) {
			this.props.alertErrors([]);
			this.setState({
				selectedFile: file
			})
		} else {
			this.props.alertErrors([{
				type: 'accept',
				action: "i",
				params: file,
				match: me.acceptTypes
			}]);
			this.setState({
				selectedFile: null
			})
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

		if (emptyFields.length > 0) {
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
			{
				showimportmodal,
				errors,
				clearErrors
			} = this.props;

		return (
			<Modal show={showimportmodal} onHide={this.close}>
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
					<Dropzone
						multiple={false}
						onDrop={this.onDrop}
					>
					{({ getRootProps, getInputProps, isDragActive }) => {
						const classEnter = isDragActive ? ' app-dropzone-enter' : ''
						return (
							<div
								{...getRootProps()}
								className={`app-dropzone${classEnter}`}
							>
								<input {...getInputProps()} />
								{this.state.selectedFile
									? (<span>
										<span>{localeUtil.getMsg("ui.file.selected")} </span>
										<span style={{color:"#F92672"}}>{this.state.selectedFile.name}</span>
									</span>)
									: (<ul>
										<li className="text-primary">{localeUtil.getMsg("ui.file.select")}</li>
										<li className="text-primary">
										{localeUtil.getMsg(
											"ui.file.accept",
											this.acceptTypes
												.map(e => `*.${e}`)
												.join(` ${localeUtil.getMsg("ui.common.or")} `)
										)}
										</li>
									</ul>)
								}
							</div>
						)
					}}
					</Dropzone>

					<div className="app-radio-group">
						<ControlLabel>
							<span className="app-input-asterisk">* </span>
							<span style={{marginRight: 20}}>{localeUtil.getMsg("ui.common.locale")}:</span>
						</ControlLabel>
						{locales.map(function(e){
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
						{projects.map(function(e){
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
					<Button bsSize="small" bsStyle="primary" onClick={this.submit}>
						{localeUtil.getMsg("ui.common.import")}
					</Button>
					<Button bsSize="small" onClick={this.close}>
						{localeUtil.getMsg("ui.common.cancel")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
