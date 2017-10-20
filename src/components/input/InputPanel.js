import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormPanel from './FormPanel'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class InputPanel extends React.PureComponent {
	static propTypes = {
		messages: PropTypes.object.isRequired,
		addTranslation: PropTypes.func.isRequired,
		alertErrors: PropTypes.func.isRequired
	};
	static contextTypes = {
		config: PropTypes.object
	};

	addTranslation() {
		const config = this.context.config,
				el = this.refFormPanel.getFormElements(),
				projects = el["project[]"],
				lenProjects = projects.length,
				locales = config.locales,
				lenLocales = locales.length;

		let i, vk, vl, locale, project = [], emptyFields = [], data = {description: el.description.value.trim()};

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

		for (i = 0; i < lenProjects; i++) {
			if (projects[i].checked) {
				project.push(projects[i].value);
			}
		}
		if ( project.length > 0 ) {
			data.project = project
		} else {
			emptyFields.push(localeUtil.getMsg("ui.common.applyto"))
		}

		if ( emptyFields.length > 0 ) {
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
			<div>
				<FormPanel
					action="c"
					messages={this.props.messages}
					ref={cmp => { this.refFormPanel = cmp; }}
				/>
				<br/>
				<div className="pull-right">
					<Button bsStyle='default' bsSize="small" onClick={this.addTranslation.bind(this)}>
						<Glyphicon glyph="plus"/> {localeUtil.getMsg("ui.common.add")}
					</Button>
				</div>
			</div>
		);
	}
}
