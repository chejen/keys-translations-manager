import '../app.less'
import React from 'react'
import Reflux from 'reflux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import InputPanel from './input/InputPanel'
import DisplayPanel from './DisplayPanel'
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
			<Grid className="app-grid">
				<Row className="app-row">
					<Col xs={12} md={2} className="app-col-left">
						<InputPanel {...this.state} />
					</Col>
					<Col xs={12} md={10}>
						<DisplayPanel {...this.state} />
					</Col>
				</Row>
			</Grid>
		);
	}
})

module.exports = App
