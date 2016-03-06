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
import TranslationActions from '../actions/TranslationActions'
import TranslationStore from '../stores/TranslationStore'
import config from '../../config'

const App = React.createClass({
	childContextTypes: {
		config: React.PropTypes.object
	},

	mixins: [
		PureRenderMixin,
		Reflux.listenTo(CountStore, "onCountChange"),
		Reflux.listenTo(ErrorStore, "onErrorChange"),
		Reflux.listenTo(TranslationStore, "onTranslationsChange")
	],

	getInitialState() {
		let projectMapping = {};
		config.projects.map(function(e){
			projectMapping[e.id] = e.name;
		});
		return {
			count: {},
			errors: [],
			projectMapping: projectMapping,
			translations: []
		}
	},

	getChildContext() {
		return {
			config: config
		};
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

	onTranslationsChange(translations) {
		this.setState({
			errors: [],
			translations: translations
		}, function() {
			CountActions.countByProject();
		});
	},

	render() {
		return(
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
		);
	}
})

module.exports = App
