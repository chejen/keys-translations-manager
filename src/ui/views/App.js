import '../app.less'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridPanel from './grid/GridPanel'
import AlertPanel from './input/AlertPanel'
import InputPanel from './input/InputPanel'
import DropdownMenu from './layout/DropdownMenu'
import Header from './layout/Header'
import MainPanel from './layout/MainPanel'
import SideBar from './layout/SideBar'
import OutputPanel from './output/OutputPanel'
import EditModal from './input/EditModal'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import config from '../../../ktm.config'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'
import * as TranslationActions from '../actions/translations'
import * as ErrorActions from '../actions/errors'
import * as ComponentActions from '../actions/components'
const languages = ["en-US", "zh-TW"]

class App extends React.Component {
	static propTypes = {
		lang: React.PropTypes.string.isRequired,
		messages: React.PropTypes.object.isRequired,
		counts: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		translations: React.PropTypes.array.isRequired,
		showeditmodal: React.PropTypes.bool.isRequired,
		editrecord: React.PropTypes.object.isRequired,

		MessageActions: React.PropTypes.object.isRequired,
		CountActions: React.PropTypes.object.isRequired,
		TranslationActions: React.PropTypes.object.isRequired,
		ErrorActions: React.PropTypes.object.isRequired,
		ComponentActions: React.PropTypes.object.isRequired
	}

	static childContextTypes = {
		config: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getChildContext() {
		return { config: config }
	}

	componentWillMount() {
		this.loadMessages();
	}

	componentDidMount() {
		this.props.TranslationActions.loadTranslations();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lang !== this.props.lang) {
			localeUtil.setMessages(nextProps.messages);
		}
		if (nextProps.translations !== this.props.translations) {
			nextProps.CountActions.loadCounts();
		}
	}

	loadMessages(lang) {
		lang = lang || navigator.language || navigator.browserLanguage;
		lang = (languages.indexOf(lang) === -1) ? "en-US" : lang;
		this.props.MessageActions.loadMessages(lang);
	}

	render() {
		const {
			MessageActions, TranslationActions,
			ErrorActions, ComponentActions,
			lang, messages, counts, errors,
			translations, showeditmodal, editrecord } = this.props

		return (lang) ? (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu lang={lang} messages={messages} loadMessages={MessageActions.loadMessages}/>
					<SideBar>
						<InputPanel messages={messages}
							alertErrors={ErrorActions.alertErrors}
							addTranslation={TranslationActions.addTranslation}/>
					</SideBar>
				</nav>
				<div id="page-wrapper">
					<AlertPanel errors={errors} clearErrors={ErrorActions.clearErrors} action="c"/>
					<OutputPanel projectCounts={counts} messages={messages}/>
					<MainPanel>
						<EditModal ref="editModal"
							data={editrecord} errors={errors}
							showeditmodal={showeditmodal}
							closeEditModal={ComponentActions.closeEditModal}
							updateTranslation={TranslationActions.updateTranslation}
							alertErrors={ErrorActions.alertErrors}
							clearErrors={ErrorActions.clearErrors}/>
						<GridPanel translations={translations} messages={messages}
							updateTranslation={TranslationActions.updateTranslation}
							removeTranslation={TranslationActions.removeTranslation}
							showEditModal={ComponentActions.showEditModal}/>
					</MainPanel>
				</div>
			</div>
		) : (<div className="app-default">
			<i className="fa fa-spinner fa-pulse fa-2x"/>
		</div>);
	}
}

function mapStateToProps(state) {
	return {
		lang: state.messages.lang,
		messages: state.messages.messages,
		counts: state.counts,
		errors: state.errors,
		translations: state.translations,
		showeditmodal: state.components.showeditmodal,
		editrecord: state.components.editrecord
	}
}

function mapDispatchToProps(dispatch) {
	return {
		MessageActions: bindActionCreators(MessageActions, dispatch),
		CountActions: bindActionCreators(CountActions, dispatch),
		TranslationActions: bindActionCreators(TranslationActions, dispatch),
		ErrorActions: bindActionCreators(ErrorActions, dispatch),
		ComponentActions: bindActionCreators(ComponentActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
