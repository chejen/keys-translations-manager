import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Input from 'react-bootstrap/lib/Input'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

if (process.env.NODE_ENV === 'development') {
	require('../../app.less');
}

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
			localeGroup = [getLabel("key", "Key"), (this.state.action === "u")
							? <Input key="key" type="text" bsSize="small" name="key" value={data.key} onChange={this.onInputChange.bind(this)} style={{backgroundColor: "#e7e7e7"}}/>
							: <Input key="key" type="text" bsSize="small" name="key" />];

		for (i=0; i<lenLocales; i++) {
			locale = locales[i]
			localeGroup.push(
				getLabel(
					locale,
					localeUtil.getMsg("ui.common.locale") + " / " + locale
				),
				<Input key={locale} type="text" bsSize="small" name={locale} defaultValue={this.state[locale]} />
			)
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
					{getLabel("applyTo", localeUtil.getMsg("ui.common.applyto"))}
				</div>
				<div className={this.state.action === "u" ? "" : "app-checkbox-options"}>
					{projectGroup}
				</div>
			</form>
		);
	}
}
