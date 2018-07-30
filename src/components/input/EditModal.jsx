import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormPanel from './FormPanel'
import AlertPanel from './AlertPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'

const locales = configUtil.getLocales()
const lenProjects = configUtil.getProjects().length

export default class EditModal extends React.PureComponent {
	static propTypes = {
		showeditmodal: PropTypes.bool.isRequired,
		closeEditModal: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
		errors: PropTypes.array.isRequired,
		updateTranslation: PropTypes.func.isRequired,
		alertErrors: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.updateTranslation = this.updateTranslation.bind(this);
		this.close = this.close.bind(this);
	}

	/* istanbul ignore next */
	updateTranslation() {
		const el = this.refFormPanel.getFormElements(),
			projects = el["project[]"],
			lenLocales = locales.length,
			project = [],
			emptyFields = [],
			data = {
				...this.props.data,
				description: el.description.value.trim()
			};
		let k, i, v, locale;

		k = el.key.value.trim()
		if (k) {
			data.key = k
		} else {
			emptyFields.push("Key")
		}

		for (i = 0; i < lenLocales; i++) {
			locale = locales[i]
			v = el[locale].value.trim()
			if (v) {
				data[locale] = v
			} else {
				emptyFields.push(localeUtil.getMsg("ui.common.locale") + " / " + locale)
			}
		}

		if (lenProjects === 1) { // projects would be an object, not an array
			if (projects.checked) {
				project.push(projects.value);
			}
		} else {
			for (i = 0; i < lenProjects; i++) {
				if (projects[i] && projects[i].checked) {
					project.push(projects[i].value);
				}
			}
		}
		if (project.length > 0) {
			data.project = project
		} else {
			emptyFields.push(localeUtil.getMsg("ui.common.applyto"))
		}

		if (emptyFields.length > 0) {
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
		const { showeditmodal, data, errors, clearErrors } = this.props;

		return (
			<Modal show={showeditmodal} onHide={this.close} bsSize='lg'>
				<Modal.Header>
					<Modal.Title>
						{localeUtil.getMsg("ui.common.edit")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AlertPanel errors={errors} clearErrors={clearErrors} action="u"/>
					<FormPanel
						ref={cmp => { this.refFormPanel = cmp; }}
						action="u" data={data}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={this.updateTranslation}>
						{localeUtil.getMsg("ui.common.update")}
					</Button>
					<Button bsSize="small" onClick={this.close}>
						{localeUtil.getMsg("ui.common.cancel")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
