import io from 'socket.io-client';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import TablePanel from './components/grid/TablePanel'
import AlertPanel from './components/input/AlertPanel'
import InputPanel from './components/input/InputPanel'
import DropdownMenu from './components/layout/DropdownMenu'
import Header from './components/layout/Header'
import MainPanel from './components/layout/MainPanel'
import SideBar from './components/layout/SideBar'
import MessagePopup from './components/layout/MessagePopup'
import Mask from './components/layout/Mask'
import OutputPanel from './components/output/OutputPanel'
import EditModal from './components/input/EditModal'
import MergeModal from './components/merge/MergeModal'
import ImportModal from './components/import/ImportModal'
import { LANGUAGES } from './constants/Languages'
import config from '../ktm.config'

export default class App extends React.Component {
	static propTypes = {
		lang: React.PropTypes.string.isRequired,
		messages: React.PropTypes.object.isRequired,
		counts: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		translations: React.PropTypes.array,//.isRequired,//might be null in the begining
		showeditmodal: React.PropTypes.bool.isRequired,
		showmergemodal: React.PropTypes.bool.isRequired,
		showimportmodal: React.PropTypes.bool.isRequired,
		showmessagepopup: React.PropTypes.bool.isRequired,
		editrecord: React.PropTypes.object.isRequired,
		keys: React.PropTypes.object.isRequired,
		mergeable: React.PropTypes.array.isRequired,

		MessageActions: React.PropTypes.object.isRequired,
		CountActions: React.PropTypes.object.isRequired,
		TranslationActions: React.PropTypes.object.isRequired,
		KeyActions: React.PropTypes.object.isRequired,
		ErrorActions: React.PropTypes.object.isRequired,
		SocketActions: React.PropTypes.object.isRequired,
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
		if (this.props.lang) {
			localeUtil.setMessages(this.props.messages);
		}
	}

	componentDidMount() {//Invoked once, only on the client
		const me = this;
		if (config.enableNotifications) {
			me.socket = io.connect('/');
			me.socket.on('ktm', function (data) {
				if (data && data.action === "datachanged") {
					me.props.ComponentActions.showMessagePopup();
				}
			});
		}
		if (!this.props.lang) {
			let lang = navigator.language || navigator.browserLanguage;
			lang = (LANGUAGES.indexOf(lang) === -1) ? "en-US" : lang;
			this.loadMessages(lang);
		}
		this.props.TranslationActions.loadTranslations();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lang !== this.props.lang) {
			localeUtil.setMessages(nextProps.messages);
		}
		if (nextProps.translations !== this.props.translations) {
			nextProps.CountActions.loadCounts();
			if (config.enableNotifications && nextProps.emitdatachange && this.socket) {
				this.socket.emit('ktm', { action: 'datachanged' });
				this.props.SocketActions.endDataChange();
			}
		}
	}

	loadMessages(lang) {
		this.props.MessageActions.loadMessages(lang);
	}

	render() {
		const {
			MessageActions, TranslationActions,
			KeyActions, ErrorActions, ComponentActions,
			lang, messages, counts, errors,
			translations, showeditmodal, editrecord,
			showmergemodal, keys, mergeable,
			showimportmodal, showmessagepopup } = this.props

		return (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu lang={lang} messages={messages}
						loadMessages={MessageActions.loadMessages}
						findMergeable={KeyActions.findMergeable}
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
						<MergeModal keys={keys}
							mergeable={mergeable}
							showmergemodal={showmergemodal}
							mergeTranslations={TranslationActions.mergeTranslations}
							closeMergeModal={ComponentActions.closeMergeModal}/>
						<EditModal data={editrecord} errors={errors}
							showeditmodal={showeditmodal}
							closeEditModal={ComponentActions.closeEditModal}
							updateTranslation={TranslationActions.updateTranslation}
							alertErrors={ErrorActions.alertErrors}
							clearErrors={ErrorActions.clearErrors}/>
						<TablePanel translations={translations || []} messages={messages}
							updateTranslation={TranslationActions.updateTranslation}
							removeTranslation={TranslationActions.removeTranslation}
							showEditModal={ComponentActions.showEditModal}/>
					</MainPanel>
				</div>
				<Mask show={!translations}/>
				<MessagePopup messages={messages}
						msg={localeUtil.getMsg("ui.tip.dataChanged")}
						closeMessagePopup={ComponentActions.closeMessagePopup}
						showmessagepopup={showmessagepopup}>
					<b><u>
						<a href="#" onClick={(event) => {
							if (event) {
								event.preventDefault();
							}
							TranslationActions.loadTranslations();
						}}>{localeUtil.getMsg("ui.common.reload")}</a>
					</u></b>
				</MessagePopup>
			</div>
		);
	}
}
