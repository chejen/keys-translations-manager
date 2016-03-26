import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Button from 'react-bootstrap/lib/Button'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import FormPanel from './FormPanel'
//import ErrorActions from '../../actions/ErrorActions'
//import TranslationActions from '../../actions/TranslationActions'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'

export default class InputPanel extends React.Component {
	static propTypes = {
		messages: React.PropTypes.object.isRequired,
		addTranslation: React.PropTypes.func.isRequired,
		alertErrors: React.PropTypes.func.isRequired
	};
	static contextTypes = {
		config: React.PropTypes.object
	};

	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	addTranslation() {
		const config = this.context.config,
				el = this.refs.formPanel.getFormElements(),
				projects = el["project[]"],
				lenProjects = projects.length,
				locales = config.locales,
				lenLocales = locales.length;

		let i, vk, vl, locale, project = [], emptyFields = [], data = {};

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
			/*ErrorActions.alert([{
				type: 'emptyfield',
				action: "c",
				params: data,
				match: emptyFields
			}]);*/
			this.props.alertErrors([{
				type: 'emptyfield',
				action: "c",
				params: data,
				match: emptyFields
			}]);
		} else {
			//ErrorActions.clear();
			//TranslationActions.addTranslation(data);
			this.props.addTranslation(data);
		}
	}

	render() {
		return(
			<div>
				<FormPanel ref="formPanel" action="c" messages={this.props.messages}/>
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
