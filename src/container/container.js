import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'
import * as TranslationActions from '../actions/translations'
import * as ErrorActions from '../actions/errors'
import * as ComponentActions from '../actions/components'

function mapStateToProps(state) {
	return {
		lang: state.messages.lang,
		messages: state.messages.messages,
		counts: state.counts,
		errors: state.errors,
		translations: state.translations,
		showeditmodal: state.components.showeditmodal,
		showimportmodal: state.components.showimportmodal,
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

export default connect(mapStateToProps, mapDispatchToProps)
