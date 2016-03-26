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
//import CountActions from '../actions/CountActions'
//import CountStore from '../stores/CountStore'
//import ErrorActions from '../actions/ErrorActions'
//import ErrorStore from '../stores/ErrorStore'
//import LangStore from '../stores/LangStore'
//import MessageActions from '../actions/MessageActions'
//import MessageStore from '../stores/MessageStore'
import TranslationActions from '../actions/TranslationActions'
import TranslationStore from '../stores/TranslationStore'
import localeUtil from 'keys-translations-manager-core/lib/localeUtil'
import config from '../../../ktm.config'
//import * as LangActions from '../actions/lang'
import * as MessageActions from '../actions/messages'
import * as CountActions from '../actions/counts'

class App extends React.Component {
	static propTypes = {
		lang: React.PropTypes.string.isRequired,
		messages: React.PropTypes.object.isRequired,
		counts: React.PropTypes.object.isRequired,
		errors: React.PropTypes.array.isRequired,
		
		//LangActions: React.PropTypes.object.isRequired,
		MessageActions: React.PropTypes.object.isRequired,
		CountActions: React.PropTypes.object.isRequired
	}

	static childContextTypes = {
		config: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			//lang: null,
			//count: {},
			//errors: [],
			//messages: null,
			translations: []
		};
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	getChildContext() {
		return { config: config }
	}

	componentWillMount() {
		this.loadMessages();
	}

	componentDidMount() {
		//this.unsubscribeCount = CountStore.listen(this.onCountChange.bind(this));
		//this.unsubscribeError = ErrorStore.listen(this.onErrorChange.bind(this));
		//this.unsubscribeLang = LangStore.listen(this.onLangChange.bind(this));
		//this.unsubscribeMessage = MessageStore.listen(this.onMessagesChange.bind(this));
		this.unsubscribeTranslation = TranslationStore.listen(this.onTranslationsChange.bind(this));

		TranslationActions.loadTranslations();
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.lang !== this.props.lang) {
			//ErrorActions.clear();
			localeUtil.setMessages(nextProps.messages);
		}
	}

	componentWillUnmount() {
		//this.unsubscribeCount();
		//this.unsubscribeError();
		//this.unsubscribeLang();
		//this.unsubscribeMessage();
		this.unsubscribeTranslation();
	}

	// onCountChange(count) {
	// 	this.setState({
	// 		count: count
	// 	});
	// }

	// onErrorChange(errors) {
	// 	this.setState({
	// 		errors: errors
	// 	});
	// }

	/*onLangChange(lang) {
		this.setState({
			lang: lang
		}, function(){
			this.loadMessages();
		}.bind(this));
	}*/

	/*onMessagesChange(messages) {
		localeUtil.setMessages(messages);
		ErrorActions.clear();
		this.setState({
			messages: messages
		});
	}*/

	onTranslationsChange(translations) {
		const { CountActions } = this.props
		this.setState({
			errors: [],
			translations: translations
		}, function() {
			//CountActions.countByProject();
			CountActions.loadCounts();
		});
	}

	loadMessages(lang) {
		console.log("loadMessages", lang);
		//MessageActions.load(this.state.lang || navigator.language || navigator.browserLanguage);
		this.props.MessageActions.loadMessages(lang || navigator.language || navigator.browserLanguage);
	}

	render() {
		const { MessageActions, lang, messages, counts, errors } = this.props
		const isReady = !($.isEmptyObject(messages))
		
		console.log("render:", messages);
		
		/*if (isReady) {
			localeUtil.setMessages(messages);
		}*/

		return (isReady) ? (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu lang={lang} messages={messages} loadMessages={MessageActions.loadMessages}/>
					<SideBar>
						<InputPanel messages={messages}/>
					</SideBar>
				</nav>
				<div id="page-wrapper">
					<AlertPanel errors={errors} action="c"/>
					<OutputPanel projectCounts={counts} messages={messages}/>
					<MainPanel>
						<GridPanel translations={this.state.translations} messages={messages}/>
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
		errors: state.errors
	}
}

function mapDispatchToProps(dispatch) {
	return {
		MessageActions: bindActionCreators(MessageActions, dispatch),
		CountActions: bindActionCreators(CountActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
