import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import TextField from './TextField'
import configUtil from '../../configUtil'

const locales = configUtil.getLocales();
const projects = configUtil.getProjects();

export default class FormPanel extends React.PureComponent {
	static propTypes = {
		data: PropTypes.object,
	};

	constructor(props) {
		super(props);

		const { data } = props;
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
				o[project.id] = false
			}
		}

		this.state = o;
	}

	getFormElements() {
		const form = ReactDOM.findDOMNode(this.refForm)
		return form.elements
	}

	onCheckboxChange(id) {
		let o = {};
		o[id] = !this.state[id];
		this.setState(o);
	}

	render() {
		const { data } = this.props,
			lenLocales = locales.length,
			lenProjects = projects.length,
			getLabel = (key, text) => <div key={"label-" + key} className="app-input-label"><span className="app-input-asterisk">*</span> {text}:</div>
		let i, p, locale,
			projectGroup = [],
			localeGroup = [];

		for (i = 0; i < lenLocales; i++) {
			locale = locales[i]
			localeGroup.push(
				<TextField key={locale}
					label={localeUtil.getMsg("ui.common.locale") + " / " + locale}
					name={locale} defaultValue={this.state[locale]} required
				/>
			)
		}
		for (i = 0; i < lenProjects; i++) {
			p = projects[i];
			projectGroup.push(
				<Checkbox key={i} name="project[]" value={p.id} checked={this.state[p.id]}
						onChange={this.onCheckboxChange.bind(this, p.id)}>
					{p.name}
				</Checkbox>
			)
		}

		return(
			<form ref={cmp => { this.refForm = cmp; }}>
				{(this.state.action === "u")
					? <TextField name="key" label="Key" defaultValue={data.key} required/>
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
