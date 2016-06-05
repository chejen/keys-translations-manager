import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
// import GridPanel from '../components/grid/GridPanel' // So far, author has no intention to support SSR for ag-grid
import AlertPanel from '../components/input/AlertPanel'
import InputPanel from '../components/input/InputPanel'
import DropdownMenu from '../components/layout/DropdownMenu'
import Header from '../components/layout/Header'
import MainPanel from '../components/layout/MainPanel'
import SideBar from '../components/layout/SideBar'
import OutputPanel from '../components/output/OutputPanel'
import EditModal from '../components/input/EditModal'
import ImportModal from '../components/import/ImportModal'
import config from '../../ktm.config'
const languages = ["en-US", "zh-TW"]

export default class App extends React.Component {
	static propTypes = {
		lang: React.PropTypes.string.isRequired,
		messages: React.PropTypes.object.isRequired,
		counts: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		translations: React.PropTypes.array.isRequired,
		showeditmodal: React.PropTypes.bool.isRequired,
		showimportmodal: React.PropTypes.bool.isRequired,
		showmessagepopup: React.PropTypes.bool.isRequired,
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
			translations, showeditmodal, editrecord,
			showimportmodal, showmessagepopup } = this.props

		return (lang) ? (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu lang={lang} messages={messages}
						loadMessages={MessageActions.loadMessages}
						showImportModal={ComponentActions.showImportModal}/>
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
						<ImportModal errors={errors}
							alertErrors={ErrorActions.alertErrors}
							clearErrors={ErrorActions.clearErrors}
							importLocale={TranslationActions.importLocale}
							showimportmodal={showimportmodal}
							closeImportModal={ComponentActions.closeImportModal}/>
						<EditModal data={editrecord} errors={errors}
							showeditmodal={showeditmodal}
							closeEditModal={ComponentActions.closeEditModal}
							updateTranslation={TranslationActions.updateTranslation}
							alertErrors={ErrorActions.alertErrors}
							clearErrors={ErrorActions.clearErrors}/>
						{/*<GridPanel translations={translations} messages={messages}
							updateTranslation={TranslationActions.updateTranslation}
							removeTranslation={TranslationActions.removeTranslation}
							showEditModal={ComponentActions.showEditModal}/>*/}
					</MainPanel>
				</div>
				<MessagePopup msg="Data has been changed by others."
						closeMessagePopup={ComponentActions.closeMessagePopup}
						showmessagepopup={showmessagepopup}>
					<b><u>
						<a href="#" onClick={(event) => {
							if (event) {
								event.preventDefault();
							}
							TranslationActions.loadTranslations();
						}}>Refresh</a>
					</u></b>
				</MessagePopup>
			</div>
		) : (<div className="app-default">
			<i className="fa fa-spinner fa-pulse fa-2x"/>
		</div>);
	}
}
