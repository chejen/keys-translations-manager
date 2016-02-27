import '../app.less';
import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Alert from 'react-bootstrap/lib/Alert'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Input from 'react-bootstrap/lib/Input'
import ErrorActions from '../actions/ErrorActions'
import TranslationActions from '../actions/TranslationActions'

const InputPanel = React.createClass({
	mixins: [PureRenderMixin],

	addTranslation() {
		const config = this.props.config
		const form = ReactDOM.findDOMNode(this.refs.form)
		const el = form.elements
		const projects = el["project[]"]
		const lenProjects = projects.length
		const locales = config.locales
		const lenLocales = locales.length
		let i
		let v
		let locale
		let project = []
		let emptyFields = []
		let data = {}

		if ( el.key.value.trim() ) {
			data.key = el.key.value.trim()
		} else {
			emptyFields.push("key")
		}

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
			ErrorActions.alert({
				type: 'emptyfield',
				raw: data,
				match: emptyFields
			});
		} else {
			ErrorActions.clear();
			TranslationActions.addTranslation(data);
		}
	},

	render() {
		const me = this;
		const config = this.props.config
		const locales = config.locales
		const projects = config.projects
		const lenLocales = locales.length
		const lenProjects = projects.length
		const getLabel = (text) => <div key={"label-" + text} className="app-input-label"><span className="app-input-asterisk">*</span> {text}:</div>
		const err = this.props.error
		let errMsg
		let locale
		let inputLocale = [getLabel("key"), <Input key="key" type="text" bsSize="small" name="key" />]
		let inputProject = []
		let i

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			inputLocale.push(getLabel(locale), <Input key={locale} type="text" bsSize="small" name={locale} />)
		}
		for (i=0; i<lenProjects; i++) {
			inputProject.push(<Input key={i} type="checkbox" label={projects[i].name} value={projects[i].id} name="project[]"/>)
		}

		if (err) {
			switch (err.type) {
				case 'duplicated':
					errMsg = "The key already exists in the following project(s): " + err.match.map(function(e){ return me.props.projectMapping[e] }).join(", ");
					break;
				case 'emptyfield':
					errMsg = "The following field(s) are required: " + err.match.join(", ");
					break;
				default:
					errMsg = err.type;
					break;
			}
		}

		return(
			<form ref="form">
				{errMsg ? <Alert bsStyle="danger">{errMsg}</Alert> : null}

				{inputLocale}

				<div className="app-input-label"><span className="app-input-asterisk">*</span> apply to:</div>
				<div className="app-checkbox-options">
					{inputProject}
				</div>

				<br/>

				<div className="app-submit-button">
					<Button bsStyle='default' bsSize="small" onClick={this.addTranslation}>
						<Glyphicon glyph="plus"/> Add
					</Button>
				</div>
			</form>
		);
	}
})

module.exports = InputPanel
//export default InputPanel
