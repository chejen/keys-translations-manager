import '../../app.less';
import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Input from 'react-bootstrap/lib/Input'
import config from '../../../config'

const FormPanel = React.createClass({
	mixins: [PureRenderMixin],

	getInitialState() {
		const data = this.props.data
		const locales = config.locales
		const projects = config.projects
		let lenLocales = locales.length
		let lenProjects = projects.length
		let locale
		let project
		let o

		if (data) { //update
			o = {
				action: "u",
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
		} else { //create
			o = {
				action: "c"
			}
			while (lenLocales--) {
				locale = locales[lenLocales]
				o[locale] = ""
			}
			while (lenProjects--) {
				project = projects[lenProjects]
				o[project.id] = true
			}
		}

		return o
	},

	getFormElements() {
		const form = ReactDOM.findDOMNode(this.refs.form)
		return form.elements
	},

	onInputChange(e) {
		let o = {};
		if (e.target.name === "key") {
			return;
		}
		o[e.target.name] = e.target.value
		this.setState(o);
	},

	onCheckboxChange(id) {
		let o = {};
		o[id] = !this.state[id];
		this.setState(o);
	},

	render() {
		const data = this.props.data;
		const locales = config.locales
		const projects = config.projects
		const lenLocales = locales.length
		const lenProjects = projects.length
		const getLabel = (key, text) => <div key={"label-" + key} className="app-input-label"><span className="app-input-asterisk">*</span> {text}:</div>
		let locale
		let localeGroup = [getLabel("key", "Key"), (this.state.action === "u")
							? <Input key="key" type="text" bsSize="small" name="key" value={data.key} onChange={this.onInputChange} style={{backgroundColor: "#e7e7e7"}}/>
							: <Input key="key" type="text" bsSize="small" name="key" />];
		let projectGroup = []
		let i
		let p

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			localeGroup.push(getLabel(locale, "Locale / " + locale), <Input key={locale} type="text" bsSize="small" name={locale} defaultValue={this.state[locale]} />)
		}
		for (i=0; i<lenProjects; i++) {
			p = projects[i];
			projectGroup.push(
				<Input key={i} type="checkbox" label={p.name}
				name="project[]" value={p.id} checked={this.state[p.id]}
				onChange={this.onCheckboxChange.bind(this, p.id)}/>)
		}

		return(
			<form ref="form">
				{localeGroup}

				<div className="app-input-label">
					{getLabel("applyTo", "Apply to")}
				</div>
				<div className={this.state.action === "u" ? "" : "app-checkbox-options"}>
					{projectGroup}
				</div>
			</form>
		);
	}
})

module.exports = FormPanel
