import '../app.less'
import React from 'react'
import Reflux from 'reflux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AlertPanel from './AlertPanel'
import GridPanel from './grid/GridPanel'
import InputPanel from './input/InputPanel'
import DropdownMenu from './layout/DropdownMenu'
import Header from './layout/Header'
import MainPanel from './layout/MainPanel'
import SideBar from './layout/SideBar'
import OutputPanel from './output/OutputPanel'
import CountActions from '../actions/CountActions'
import CountStore from '../stores/CountStore'
import ErrorStore from '../stores/ErrorStore'
import LangStore from '../stores/LangStore'
import MessageActions from '../actions/MessageActions'
import MessageStore from '../stores/MessageStore'
import TranslationActions from '../actions/TranslationActions'
import TranslationStore from '../stores/TranslationStore'
import LocaleUtil from '../../util/LocaleUtil'
import config from '../../config'

const App = React.createClass({
	childContextTypes: {
		config: React.PropTypes.object
	},

	mixins: [
		PureRenderMixin,
		Reflux.listenTo(CountStore, "onCountChange"),
		Reflux.listenTo(ErrorStore, "onErrorChange"),
		Reflux.listenTo(LangStore, "onLangChange"),
		Reflux.listenTo(MessageStore, "onMessagesChange"),
		Reflux.listenTo(TranslationStore, "onTranslationsChange")
	],

	getInitialState() {
		let projectMapping = {};
		config.projects.map(function(e){
			projectMapping[e.id] = e.name;
		});
		return {
			lang: null,
			count: {},
			errors: [],
			messages: null,
			projectMapping: projectMapping,
			translations: []
		}
	},

	getChildContext() {
		return {
			config: config
		};
	},

	componentWillMount() {
		this.loadMessages();
	},

	componentDidMount() {
		TranslationActions.loadTranslations();
	},

	onCountChange(count) {
		this.setState({
			count: count
		});
	},

	onErrorChange(errors) {
		this.setState({
			errors: errors
		});
	},

	onLangChange(lang) {
		this.setState({
			lang: lang
		}, function(){
			this.loadMessages();
		}.bind(this));
	},

	onMessagesChange(messages) {
		LocaleUtil.setMessages(messages);
		this.setState({
			messages: messages
		});
	},

	onTranslationsChange(translations) {
		this.setState({
			errors: [],
			translations: translations
		}, function() {
			CountActions.countByProject();
		});
	},

	loadMessages() {
		MessageActions.load(this.state.lang || navigator.language || navigator.browserLanguage);
	},

	render() {
		return this.state.messages ? (
			<div id="wrapper">
				<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
					<Header/>
					<DropdownMenu/>
					<SideBar>
						<InputPanel/>
					</SideBar>
				</nav>
				<div id="page-wrapper">
					{this.state.errors.length > 0 ? <AlertPanel errors={this.state.errors} action="c"/> : <br/>}
					<OutputPanel count={this.state.count}/>
					<MainPanel>
						<GridPanel translations={this.state.translations}/>
					</MainPanel>
				</div>
			</div>
		) : (<div className="app-default">
			<i className="fa fa-spinner fa-pulse"/>
		</div>);
	}
})

module.exports = App
