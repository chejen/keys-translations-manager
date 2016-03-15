import '../app.less'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill();
import 'isomorphic-fetch'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import GridPanel from './grid/GridPanel'
import AlertPanel from './input/AlertPanel'
import InputPanel from './input/InputPanel'
import DropdownMenu from './layout/DropdownMenu'
import Header from './layout/Header'
import MainPanel from './layout/MainPanel'
import SideBar from './layout/SideBar'
import OutputPanel from './output/OutputPanel'
import CountActions from '../actions/CountActions'
import CountStore from '../stores/CountStore'
import ErrorActions from '../actions/ErrorActions'
import ErrorStore from '../stores/ErrorStore'
import LangStore from '../stores/LangStore'
import MessageActions from '../actions/MessageActions'
import MessageStore from '../stores/MessageStore'
import TranslationActions from '../actions/TranslationActions'
import TranslationStore from '../stores/TranslationStore'
import LocaleUtil from '../../util/LocaleUtil'
import config from '../../config'

export default class App extends React.Component {
	static childContextTypes = {
		config: React.PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			lang: null,
			count: {},
			errors: [],
			messages: null,
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
		this.unsubscribeCount = CountStore.listen(this.onCountChange.bind(this));
		this.unsubscribeError = ErrorStore.listen(this.onErrorChange.bind(this));
		this.unsubscribeLang = LangStore.listen(this.onLangChange.bind(this));
		this.unsubscribeMessage = MessageStore.listen(this.onMessagesChange.bind(this));
		this.unsubscribeTranslation = TranslationStore.listen(this.onTranslationsChange.bind(this));

		TranslationActions.loadTranslations();
	}

	componentWillUnmount() {
		this.unsubscribeCount();
		this.unsubscribeError();
		this.unsubscribeLang();
		this.unsubscribeMessage();
		this.unsubscribeTranslation();
	}

	onCountChange(count) {
		this.setState({
			count: count
		});
	}

	onErrorChange(errors) {
		this.setState({
			errors: errors
		});
	}

	onLangChange(lang) {
		this.setState({
			lang: lang
		}, function(){
			this.loadMessages();
		}.bind(this));
	}

	onMessagesChange(messages) {
		LocaleUtil.setMessages(messages);
		ErrorActions.clear();
		this.setState({
			messages: messages
		});
	}

	onTranslationsChange(translations) {
		this.setState({
			errors: [],
			translations: translations
		}, function() {
			CountActions.countByProject();
		});
	}

	loadMessages() {
		MessageActions.load(this.state.lang || navigator.language || navigator.browserLanguage);
	}

	render() {
		return this.state.messages ? (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu messages={this.state.messages}/>
					<SideBar>
						<InputPanel messages={this.state.messages}/>
					</SideBar>
				</nav>
				<div id="page-wrapper">
					<AlertPanel errors={this.state.errors} action="c"/>
					<OutputPanel count={this.state.count} messages={this.state.messages}/>
					<MainPanel>
						<GridPanel translations={this.state.translations} messages={this.state.messages}/>
					</MainPanel>
				</div>
			</div>
		) : (<div className="app-default">
			<i className="fa fa-spinner fa-pulse fa-2x"/>
		</div>);
	}
}
