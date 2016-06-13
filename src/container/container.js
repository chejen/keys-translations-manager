import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'
import * as TranslationActions from '../actions/translations'
import * as KeyActions from '../actions/keys'
import * as ErrorActions from '../actions/errors'
import * as SocketActions from '../actions/socket'
import * as ComponentActions from '../actions/components'

function mapStateToProps(state) {
	return {
		lang: state.messages.lang,
		messages: state.messages.messages,
		counts: state.counts,
		errors: state.errors,
		translations: state.translations,
		emitdatachange: state.socket.emitdatachange,
		showeditmodal: state.components.showeditmodal,
		showmergemodal: state.components.showmergemodal,
		showimportmodal: state.components.showimportmodal,
		showmessagepopup: state.components.showmessagepopup,
		keys: state.components.keys,
		mergeable: state.components.mergeable,
		editrecord: state.components.editrecord
	}
}

function mapDispatchToProps(dispatch) {
	return {
		MessageActions: bindActionCreators(MessageActions, dispatch),
		CountActions: bindActionCreators(CountActions, dispatch),
		TranslationActions: bindActionCreators(TranslationActions, dispatch),
		KeyActions: bindActionCreators(KeyActions, dispatch),
		ErrorActions: bindActionCreators(ErrorActions, dispatch),
		SocketActions: bindActionCreators(SocketActions, dispatch),
		ComponentActions: bindActionCreators(ComponentActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)
