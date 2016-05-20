import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import TextField from './TextField'

// if (process.env.NODE_ENV === 'development') {
// 	require('../../app.less');
// }

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

	onInputChange(e) {
		let o = {};
		if (e.target.name === "key") {
			return;
		}
		o[e.target.name] = e.target.value
		this.setState(o);
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
			// localeGroup = [getLabel("key", "Key"), (this.state.action === "u")
			// 				? <Input key="key" type="text" bsSize="small" name="key" value={data.key} onChange={this.onInputChange.bind(this)} style={{backgroundColor: "#e7e7e7"}}/>
			// 				: <Input key="key" type="text" bsSize="small" name="key" />],
			localeGroup = [];
			// descriptionGroup = [<div key={"label-description"} className="app-input-label">{localeUtil.getMsg("ui.common.desc")}:</div>,
			// 				<Input key="description" type="textarea" bsSize="small" name="description" defaultValue={this.state.description} />];

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			localeGroup.push(
				<TextField key={locale} label={localeUtil.getMsg("ui.common.locale") + " / " + locale}
					name={locale} defaultValue={this.state[locale]} required/>
				// getLabel(
				// 	locale,
				// 	localeUtil.getMsg("ui.common.locale") + " / " + locale
				// ),
				// <Input key={locale} type="text" bsSize="small" name={locale} defaultValue={this.state[locale]} />
			)
		}
		for (i=0; i<lenProjects; i++) {
			p = projects[i];
			projectGroup.push(
				// <Input key={i} type="checkbox" label={p.name}
				// name="project[]" value={p.id} checked={this.state[p.id]}
				// onChange={this.onCheckboxChange.bind(this, p.id)}/>)
				<Checkbox key={i} name="project[]" value={p.id} checked={this.state[p.id]}
						onChange={this.onCheckboxChange.bind(this, p.id)}>
					{p.name}
				</Checkbox>
			)
		}

		return(
			<form ref="form">
				{(this.state.action === "u")
					? <TextField name="key" label="Key" required value={data.key} onChange={this.onInputChange.bind(this)}/>
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
