import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
import Input from 'react-bootstrap/lib/Input'
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

	submit() {
		console.log("submit");
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

					<Input type="file" bsSize="small" name="file"/>

					{localeUtil.getMsg("ui.common.locale")}:
					{config.locales.map(function(e){
						return (
							<span key={e}>&nbsp;&nbsp;&nbsp;
							<input type="radio" name="locale" value={e} checked={me.state.selectedLocale===e}
								onChange={me.setLocale.bind(me, e)}/> {e}
							</span>
						);
					})}

					<br/>

					{localeUtil.getMsg("ui.common.applyto")}:
					{config.projects.map(function(e){
						let {id, name} = e
						return (
							<span key={id}>&nbsp;&nbsp;&nbsp;
							<input type="radio" name="project" value={id} checked={me.state.selectedProject===id}
								onChange={me.setProject.bind(me, id)}/> {name}
							</span>
						);
					})}

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
