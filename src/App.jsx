import io from 'socket.io-client'
import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import AlertPanel from './components/input/AlertPanel'
import InputPanel from './components/input/InputPanel'
import DropdownMenu from './components/layout/DropdownMenu'
import Header from './components/layout/Header'
import MainPanel from './components/layout/MainPanel'
import SideBar from './components/layout/SideBar'
import MessagePopup from './components/layout/MessagePopup'
import OutputPanel from './components/output/OutputPanel'
import HistoryModal from './components/history/HistoryModal'
import EditModal from './components/input/EditModal'
import MergeModal from './components/merge/MergeModal'
import ImportModal from './components/import/ImportModal'
import TablePanel from './components/grid/TablePanel'
import ConfirmModal from './components/grid/ConfirmModal'
import VisContainer from './containers/VisContainer'
import { LANGUAGES } from './constants/Languages'
import config from '../ktm.config'
import ReleaseModal from './components/input/ReleaseModal'
import ReleaseSelector from './components/layout/ReleaseSelector'
import Mask from './components/layout/Mask'

class App extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node,
		lang: PropTypes.string.isRequired,
		messages: PropTypes.object.isRequired,
		counts: PropTypes.object.isRequired,
		errors: PropTypes.array.isRequired,
		translations: PropTypes.array,
		showreleasemodal: PropTypes.bool.isRequired,
		showhistorymodal: PropTypes.bool.isRequired,
		showeditmodal: PropTypes.bool.isRequired,
		showconfirmmodal: PropTypes.bool.isRequired,
		showmergemodal: PropTypes.bool.isRequired,
		showimportmodal: PropTypes.bool.isRequired,
		showmessagepopup: PropTypes.bool.isRequired,
		emitdatachange: PropTypes.bool.isRequired,
		reloaddata: PropTypes.bool.isRequired,
		editrecord: PropTypes.object.isRequired,
		historylog: PropTypes.array.isRequired,
		historystatus: PropTypes.string.isRequired,
		keys: PropTypes.object.isRequired,
		mergeable: PropTypes.array.isRequired,
		showMask:PropTypes.bool.isRequired,
		releaseLoading:PropTypes.bool.isRequired,
		releases:PropTypes.array.isRequired,
		currentRelease:PropTypes.string.isRequired,

		MessageActions: PropTypes.object.isRequired,
		CountActions: PropTypes.object.isRequired,
		TranslationActions: PropTypes.object.isRequired,
		HistoryActions: PropTypes.object.isRequired,
		KeyActions: PropTypes.object.isRequired,
		ErrorActions: PropTypes.object.isRequired,
		SocketActions: PropTypes.object.isRequired,
		ComponentActions: PropTypes.object.isRequired,
		ReleaseActions: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		if (props.lang) {
			localeUtil.setMessages(props.messages);
		}
		this.state = { socket: null }
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
		this.props.ReleaseActions.getReleases();
	}

	componentDidUpdate() {
		if (this.props.emitdatachange && config.enableNotifications && this.state.socket) {
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
			MessageActions, TranslationActions, CountActions, ReleaseActions,
			HistoryActions, KeyActions, ErrorActions, ComponentActions,
			lang, messages, counts, errors, translations,
			showeditmodal, showconfirmmodal, editrecord, reloaddata,
			showhistorymodal, showreleasemodal, historylog, historystatus,
			showmergemodal, keys, mergeable, currentRelease, releases, releaseLoading, showMask,
			showimportmodal, showmessagepopup } = this.props

		localeUtil.setMessages(messages);

		return (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<ReleaseSelector
						selectRelease={ReleaseActions.selectRelease}
						currentRelease={currentRelease}
						releaseLoading={releaseLoading}
						releases={releases} />
					<DropdownMenu lang={lang} messages={messages}
						loadMessages={MessageActions.loadMessages}
						findMergeable={KeyActions.findMergeable}
						showImportModal={ComponentActions.showImportModal}
						showReleaseModal={ComponentActions.showReleaseModal}/>
					<SideBar>
						<InputPanel messages={messages}
							alertErrors={ErrorActions.alertErrors}
							addTranslation={TranslationActions.addTranslation}/>
					</SideBar>
				</nav>
				<div id="page-wrapper">
					<AlertPanel errors={errors} clearErrors={ErrorActions.clearErrors} action="c"/>
					<OutputPanel currentRelease={currentRelease} projectCounts={counts} messages={messages}/>
					<MainPanel>
						<ReleaseModal errors={errors}
							currentRelease={currentRelease}
							showreleasemodal={showreleasemodal}
							closeReleaseModal={ComponentActions.closeReleaseModal}
							newRelease={ReleaseActions.newRelease}
							showMask={ComponentActions.showMask} />
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
						<ConfirmModal data={editrecord}
							showconfirmmodal={showconfirmmodal}
							closeConfirmModal={ComponentActions.closeConfirmModal}
							removeTranslation={TranslationActions.removeTranslation}
						/>
						<HistoryModal translation={editrecord}
							showhistorymodal={showhistorymodal}
							historylog={historylog}
							historystatus={historystatus}
							closeHistoryModal={ComponentActions.closeHistoryModal}
							loadHistory={HistoryActions.loadHistory}
						/>
						<Route exact path="/" render={() => (
							<TablePanel messages={messages}
								translations={translations}
								reloaddata={reloaddata}
								TranslationActions={TranslationActions}
								ComponentActions={ComponentActions}
								CountActions={CountActions}
								currentRelease={currentRelease} />
						)}/>
						<Route path="/vis/:projectId" render={props => (
							<VisContainer {...props}
								translations={translations}
								reloaddata={reloaddata}
								TranslationActions={TranslationActions}
								ComponentActions={ComponentActions}
								CountActions={CountActions}/>
						)}/>
					</MainPanel>
				</div>
				<MessagePopup messages={messages}
					msg={localeUtil.getMsg("ui.tip.dataChanged")}
					closeMessagePopup={ComponentActions.closeMessagePopup}
					showmessagepopup={showmessagepopup}
				>
					<b><u>
						<a href="#" onClick={(event) => {
							if (event) {
								event.preventDefault();
							}
							ComponentActions.reloadData();
						}}>{localeUtil.getMsg("ui.common.reload")}</a>
					</u></b>
				</MessagePopup>
				<Mask show={showMask} />
			</div>
		);
	}
}

export default hot(module)(App)
