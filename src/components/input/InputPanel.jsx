import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import FormPanel from './FormPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import configUtil from '../../configUtil'

const lenProjects = configUtil.getProjects().length

export default class InputPanel extends React.PureComponent {
	static propTypes = {
		messages: PropTypes.object.isRequired,
		addTranslation: PropTypes.func.isRequired,
		alertErrors: PropTypes.func.isRequired,
	};

	addTranslation() {
		const el = this.refFormPanel.getFormElements(),
				projects = el["project[]"],
				locales = configUtil.getLocales(),
				lenLocales = locales.length;

		let i, vk, vl, locale, project = [], emptyFields = [],
			data = { description: el.description.value.trim() };

		vk = el.key.value.trim()
		if (vk) {
			data.key = vk
		} else {
			emptyFields.push("Key")
		}

		for (i = 0; i < lenLocales; i++) {
			locale = locales[i]
			vl = el[locale].value.trim()
			if (vl) {
				data[locale] = vl
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
				action: "c",
				params: data,
				match: emptyFields
			}]);
		} else {
			this.props.addTranslation(data);
		}
	}

	render() {
		return(
			<Fragment>
				<FormPanel
					action="c"
					messages={this.props.messages}
					ref={cmp => { this.refFormPanel = cmp; }}
				/>
				<div className="app-input-btn-add">
					<Button 
						bsStyle='default'
						bsSize="small"
						onClick={this.addTranslation.bind(this)}
						style={{ width: '100%' }}
					>
						<i className="fas fa-plus-circle fa-lg" />
						{' '}
						{localeUtil.getMsg("ui.common.add")}
					</Button>
				</div>
			</Fragment>
		);
	}
}
