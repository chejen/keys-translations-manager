import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'
import * as TranslationActions from '../actions/translations'
import * as HistoryActions from '../actions/history'
import * as KeyActions from '../actions/keys'
import * as ErrorActions from '../actions/errors'
import * as SocketActions from '../actions/socket'
import * as ComponentActions from '../actions/components'
import App from '../App'

function mapStateToProps(state) {
	return {
		counts: state.counts,
		errors: state.errors,
		translations: state.translations,
		emitdatachange: state.socket.emitdatachange,
		showeditmodal: state.components.showeditmodal,
		showconfirmmodal: state.components.showconfirmmodal,
		showhistorymodal: state.components.showhistorymodal,
		showmergemodal: state.components.showmergemodal,
		showimportmodal: state.components.showimportmodal,
		showmessagepopup: state.components.showmessagepopup,
		reloaddata: state.components.reloaddata,
		keys: state.components.keys,
		mergeable: state.components.mergeable,
		editrecord: state.components.editrecord,
		translationId: state.components.translationId,
		...state.messages,
		...state.history,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		MessageActions: bindActionCreators(MessageActions, dispatch),
		CountActions: bindActionCreators(CountActions, dispatch),
		TranslationActions: bindActionCreators(TranslationActions, dispatch),
		HistoryActions: bindActionCreators(HistoryActions, dispatch),
		KeyActions: bindActionCreators(KeyActions, dispatch),
		ErrorActions: bindActionCreators(ErrorActions, dispatch),
		SocketActions: bindActionCreators(SocketActions, dispatch),
		ComponentActions: bindActionCreators(ComponentActions, dispatch)
	}
}

// Dealing with Update Blocking
//  - https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
