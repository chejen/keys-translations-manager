import React from 'react'
import Reflux from 'reflux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import FormPanel from './FormPanel'
import AlertPanel from '../AlertPanel'
import ErrorActions from '../../actions/ErrorActions'
import ErrorStore from '../../stores/ErrorStore'
import TranslationActions from '../../actions/TranslationActions'
import config from '../../../config'
import LocaleUtil from '../../../util/LocaleUtil'

const EditModal = React.createClass({
	mixins: [
		PureRenderMixin,
		Reflux.listenTo(ErrorStore, "onErrorChange")
	],

	getInitialState() {
		return {
			showModal: false
		}
	},

	updateTranslation() {
		const el = this.refs.formPanel.getFormElements(),
			projects = el["project[]"],
			lenProjects = projects.length,
			locales = config.locales,
			lenLocales = locales.length;
		let i, v, locale,
			project = [],
			emptyFields = [],
			data = this.props.data;

		for (i = 0; i < lenLocales; i++) {
			locale = locales[i]
			v = el[locale].value.trim()
			if (v) {
				data[locale] = v
			} else {
				emptyFields.push(locale)
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
			emptyFields.push(LocaleUtil.getMsg("ui.common.applyto"))
		}

		if ( emptyFields.length > 0 ) {
			ErrorActions.alert([{
				type: 'emptyfield',
				action: "u",
				params: data,
				match: emptyFields
			}]);
		} else {
			ErrorActions.clear();
			TranslationActions.updateTranslation(data);
		}
	},

	onErrorChange(errors) {
		this.setState({
			errors: errors
		});
	},

	close() {
		this.setState({
			showModal: false,
			errors: []
		});
	},

	open() {
		this.setState({
			showModal: true,
			errors: []
		});
	},

	render() {
		const data = this.props.data;
		return (
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header>
					<Modal.Title>
						{LocaleUtil.getMsg("ui.common.edit")}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AlertPanel errors={this.state.errors} action="u"/>
					<FormPanel ref="formPanel" action="u" data={data}/>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={this.updateTranslation}>
						{LocaleUtil.getMsg("ui.common.update")}
					</Button>
					<Button bsSize="small" onClick={this.close}>
						{LocaleUtil.getMsg("ui.common.cancel")}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = EditModal
