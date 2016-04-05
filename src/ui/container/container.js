import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
// import React from 'react'
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import GridPanel from './grid/GridPanel'
// import AlertPanel from './input/AlertPanel'
// import InputPanel from './input/InputPanel'
// import DropdownMenu from './layout/DropdownMenu'
// import Header from './layout/Header'
// import MainPanel from './layout/MainPanel'
// import SideBar from './layout/SideBar'
// import OutputPanel from './output/OutputPanel'
// import EditModal from './input/EditModal'
// import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
// import config from '../../../ktm.config'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'
import * as TranslationActions from '../actions/translations'
import * as ErrorActions from '../actions/errors'
import * as ComponentActions from '../actions/components'
//const languages = ["en-US", "zh-TW"]

// if (process.env.NODE_ENV === 'development') {
// 	require('../app.less');
// }

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

//export default connect(mapStateToProps, mapDispatchToProps)(App)
export default connect(mapStateToProps, mapDispatchToProps)

// export default function(App) {
// 	console.log("options", App);
// 	return connect(mapStateToProps, mapDispatchToProps)(App)
// }
