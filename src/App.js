import io from 'socket.io-client';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import AlertPanel from './components/input/AlertPanel'
import InputPanel from './components/input/InputPanel'
import DropdownMenu from './components/layout/DropdownMenu'
import Header from './components/layout/Header'
import MainPanel from './components/layout/MainPanel'
import SideBar from './components/layout/SideBar'
import MessagePopup from './components/layout/MessagePopup'
import OutputPanel from './components/output/OutputPanel'
import EditModal from './components/input/EditModal'
import MergeModal from './components/merge/MergeModal'
import ImportModal from './components/import/ImportModal'
import { LANGUAGES } from './constants/Languages'
import config from '../ktm.config'

export default class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.node,
		location: React.PropTypes.object.isRequired,
		params: React.PropTypes.object.isRequired,
		lang: React.PropTypes.string.isRequired,
		messages: React.PropTypes.object.isRequired,
		counts: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		translations: React.PropTypes.array,
		showeditmodal: React.PropTypes.bool.isRequired,
		showmergemodal: React.PropTypes.bool.isRequired,
		showimportmodal: React.PropTypes.bool.isRequired,
		showmessagepopup: React.PropTypes.bool.isRequired,
		emitdatachange: React.PropTypes.bool.isRequired,
		reloaddata: React.PropTypes.bool.isRequired,
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
		config: React.PropTypes.object,
		socket: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = { socket: null }
	}

	getChildContext() {
		return { config, socket: this.state.socket }
	}

	componentWillMount() {
		if (this.props.lang) {
			localeUtil.setMessages(this.props.messages);
		}
	}

	componentDidMount() {//Invoked once, only on the client
		const me = this;
		if (config.enableNotifications) {
			me.setSocket();
		}
		if (!this.props.lang) {
			let lang = navigator.language || navigator.browserLanguage;
			lang = (LANGUAGES.indexOf(lang) === -1) ? "en-US" : lang;
			this.loadMessages(lang);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.lang !== this.props.lang) {
			localeUtil.setMessages(nextProps.messages);
		}
		if (nextProps.emitdatachange && config.enableNotifications && this.state.socket) {
			this.state.socket.emit('ktm', { action: 'datachanged' });
			this.props.SocketActions.endDataChange();
		}
	}

	setSocket() {
		const me = this;
		let socket;
		socket = io.connect('/');
		socket.on('ktm', function (data) {
			if (data && data.action === "datachanged") {
				me.props.ComponentActions.showMessagePopup();
			}
		});
		this.setState({ socket });
	}

	loadMessages(lang) {
		this.props.MessageActions.loadMessages(lang);
	}

	render() {
		const {
			MessageActions, TranslationActions, CountActions,
			KeyActions, ErrorActions, ComponentActions,
			lang, messages, counts, errors,
			translations, showeditmodal, editrecord, reloaddata,
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
						{this.props.children &&
							React.cloneElement(this.props.children, {
								messages,
								translations,
								reloaddata,
								CountActions
							})
						}
					</MainPanel>
				</div>
				<MessagePopup messages={messages}
						msg={localeUtil.getMsg("ui.tip.dataChanged")}
						closeMessagePopup={ComponentActions.closeMessagePopup}
						showmessagepopup={showmessagepopup}>
					<b><u>
						<a href="#" onClick={(event) => {
							if (event) {
								event.preventDefault();
							}
							ComponentActions.reloadData();
						}}>{localeUtil.getMsg("ui.common.reload")}</a>
					</u></b>
				</MessagePopup>
			</div>
		);
	}
}
