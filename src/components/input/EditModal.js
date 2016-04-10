import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormPanel from './FormPanel'
import AlertPanel from '../input/AlertPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class EditModal extends React.Component {
	static propTypes = {
		showeditmodal: React.PropTypes.bool.isRequired,
		closeEditModal: React.PropTypes.func.isRequired,
		data: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		updateTranslation: React.PropTypes.func.isRequired,
		alertErrors: React.PropTypes.func.isRequired,
		clearErrors: React.PropTypes.func.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			showModal: false
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	updateTranslation() {
		const config = this.context.config,
			el = this.refs.formPanel.getFormElements(),
			projects = el["project[]"],
			lenProjects = projects.length,
			locales = config.locales,
			lenLocales = locales.length;
		let i, v, locale,
			project = [],
			emptyFields = [],
			data = Object.assign({}, this.props.data);

		for (i = 0; i < lenLocales; i++) {
			locale = locales[i]
			v = el[locale].value.trim()
			if (v) {
				data[locale] = v
			} else {
				emptyFields.push(localeUtil.getMsg("ui.common.locale") + " / " + locale)
			}
		}

		for (i = 0; i < lenProjects; i++) {
			if (projects[i].checked) {
				project.push(projects[i].value);
			}
		}
		if ( project.length > 0 ) {
			data.project = project
		} else {
			emptyFields.push(localeUtil.getMsg("ui.common.applyto"))
		}

		if ( emptyFields.length > 0 ) {
			this.props.alertErrors([{
				type: 'emptyfield',
				action: "u",
				params: data,
				match: emptyFields
			}]);
		} else {
			this.props.updateTranslation(data);
		}
	}

	close() {
		this.props.closeEditModal()
	}

	render() {
		const { data, errors, clearErrors } = this.props;

		return (
			<Modal show={this.props.showeditmodal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>
						{localeUtil.getMsg("ui.common.edit")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AlertPanel errors={errors} clearErrors={clearErrors} action="u"/>
					<FormPanel ref="formPanel" action="u" data={data}/>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={this.updateTranslation.bind(this)}>
						{localeUtil.getMsg("ui.common.update")}
					</Button>
					<Button bsSize="small" onClick={this.close.bind(this)}>
						{localeUtil.getMsg("ui.common.cancel")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
