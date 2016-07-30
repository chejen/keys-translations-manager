import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import TextField from './TextField'

export default class FormPanel extends React.Component {
	static propTypes = {
		data: React.PropTypes.object
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context);

		const config = context.config,
			data = props.data,
			locales = config.locales,
			projects = config.projects;
		let lenLocales = locales.length,
			lenProjects = projects.length,
			locale,
			project,
			o;

		if (data) { //update
			o = {
				action: "u",
				errors: [],
				key: data.key,
				description: data.description
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

		this.state = o;
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getFormElements() {
		const form = ReactDOM.findDOMNode(this.refs.form)
		return form.elements
	}

	onCheckboxChange(id) {
		let o = {};
		o[id] = !this.state[id];
		this.setState(o);
	}

	render() {
		const config = this.context.config,
			data = this.props.data,
			locales = config.locales,
			projects = config.projects,
			lenLocales = locales.length,
			lenProjects = projects.length,
			getLabel = (key, text) => <div key={"label-" + key} className="app-input-label"><span className="app-input-asterisk">*</span> {text}:</div>
		let i, p, locale,
			projectGroup = [],
			localeGroup = [];

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			localeGroup.push(
				<TextField key={locale} label={localeUtil.getMsg("ui.common.locale") + " / " + locale}
					name={locale} defaultValue={this.state[locale]} required/>
			)
		}
		for (i=0; i<lenProjects; i++) {
			p = projects[i];
			projectGroup.push(
				<Checkbox key={i} name="project[]" value={p.id} checked={this.state[p.id]}
						onChange={this.onCheckboxChange.bind(this, p.id)}>
					{p.name}
				</Checkbox>
			)
		}

		return(
			<form ref="form">
				{(this.state.action === "u")
					? <TextField name="key" label="Key" value={data.key} readOnly required/>
					: <TextField name="key" label="Key" required/>
				}

				{localeGroup}

				<TextField name="description" componentClass="textarea"
					label={localeUtil.getMsg("ui.common.desc")}
					defaultValue={this.state.description}/>

				<div className="app-input-label">
					{getLabel("applyTo", localeUtil.getMsg("ui.common.applyto"))}
				</div>

				<div className={this.state.action === "u" ? "" : "app-checkbox-options"}>
					{projectGroup}
				</div>
			</form>
		);
	}
}
