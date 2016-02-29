import '../../app.less';
import React from 'react'
//import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormPanel from './FormPanel'
import AlertPanel from '../AlertPanel'
import ErrorActions from '../../actions/ErrorActions'
import TranslationActions from '../../actions/TranslationActions'

const InputPanel = React.createClass({
	mixins: [PureRenderMixin],

	addTranslation() {
		const config = this.props.config
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
			ErrorActions.alert([{
				type: 'emptyfield',
				action: "c",
				params: data,
				match: emptyFields
			}]);
		} else {
			ErrorActions.clear();
			TranslationActions.addTranslation(data);
		}
	},

	render() {
		return(
			<div>
				<AlertPanel errors={this.props.errors} action="c"/>
				<FormPanel ref="formPanel" action="c"/>
				<br/>
				<div className="app-submit-button">
					<Button bsStyle='default' bsSize="small" onClick={this.addTranslation}>
						<Glyphicon glyph="plus"/> Add
					</Button>
				</div>
			</div>
		);
	}
})

module.exports = InputPanel
