//import '../app.less';
import React from 'react'
//import ReactDOM from 'react-dom'
import Reflux from 'reflux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
//import Input from 'react-bootstrap/lib/Input'
import Modal from 'react-bootstrap/lib/Modal'
import FormPanel from './FormPanel'
import AlertPanel from '../AlertPanel'
import ErrorActions from '../../actions/ErrorActions'
import ErrorStore from '../../stores/ErrorStore'
import TranslationActions from '../../actions/TranslationActions'
import config from '../../../config'

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
	/*getInitialState() {
		const data = this.props.data
		const locales = config.locales
		const projects = config.projects
		let lenLocales = locales.length
		let lenProjects = projects.length
		let locale
		let project
		let o = {
			showModal: false,
			errors: [],
			key: data.key
		}
		while (lenLocales--) {
			locale = locales[lenLocales]
			o[locale] = data[locale]
		}
		while (lenProjects--) {
			project = projects[lenProjects]
			o[project.id] = (data.project.indexOf(project.id) >= 0)
		}
		return o
	},*/

	updateTranslation() {
		//const form = ReactDOM.findDOMNode(this.refs.form)
		//const el = form.elements
		const el = this.refs.formPanel.getFormElements()
		const projects = el["project[]"]
		const lenProjects = projects.length
		const locales = config.locales
		const lenLocales = locales.length
		let i
		let v
		let locale
		let project = []
		let emptyFields = []
		let data = this.props.data

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
			emptyFields.push("apply to")
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

	/*onCheckboxChange(id) {
		let o = {};
		o[id] = !this.state[id];
		this.setState(o);
	},

	onInputChange(e) {
		if (e.target.name === "key") {
			return;
		}
		let o = {};
		o[e.target.name] = e.target.value
		this.setState(o);
	},*/

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
		/*const locales = config.locales
		const projects = config.projects
		const lenLocales = locales.length
		const lenProjects = projects.length
		const getLabel = (text) => <div key={"label-" + text} className="app-input-label"><span className="app-input-asterisk">*</span> {text}:</div>
		let locale
		let inputLocale = [getLabel("key"), <Input key="key" type="text" bsSize="small" name="key" value={data.key} onChange={this.onInputChange} style={{backgroundColor: "#e7e7e7"}}/>]
		let inputProject = []
		let i
		let p
		

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			inputLocale.push(getLabel(locale), <Input key={locale} value={this.state[locale]} type="text" bsSize="small" name={locale} onChange={this.onInputChange} />)
		}
		for (i=0; i<lenProjects; i++) {
			p = projects[i];
			inputProject.push(
				<Input key={i} type="checkbox" label={p.name}
					name="project[]" value={p.id} checked={this.state[p.id]}
					onChange={this.onCheckboxChange.bind(this, p.id)} />
			)
		}*/

		return (
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Body>
					<AlertPanel errors={this.state.errors} action="u"/>
					<FormPanel ref="formPanel" action="u" data={data}/>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="small" bsStyle="primary" onClick={this.updateTranslation}>Update</Button>
					<Button bsSize="small" onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

module.exports = EditModal
