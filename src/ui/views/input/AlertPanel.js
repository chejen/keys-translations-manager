import '../../app.less';
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Alert from 'react-bootstrap/lib/Alert'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import ErrorActions from '../../actions/ErrorActions'
import config from '../../../config'

const AlertPanel = React.createClass({
	mixins: [PureRenderMixin],

	handleDismiss(){
		ErrorActions.clear();
	},

	render() {
		const errors = this.props.errors
		const len = errors.length
		let err
		let errMsg = []
		let cmp
		let i
		let counter = 0
		let projectMapping = {}

		config.projects.map(function(e){
			projectMapping[e.id] = e.name;
		});

		for (i=0; i<len; i++) {
			err = errors[i];
			if (err.action !== this.props.action) {
				break;
			}
			switch (err.type) {
				case 'equals':
					errMsg.push("The key already exists in the following project(s): " +
						err.match.map(function(e){
							return projectMapping[e]
						}).join(", ")
					);
					break;
				case 'contains':
					errMsg.push("The key conflicts with '" + err.key + "' in the following project(s): " +
						err.match.map(function(e){
							return projectMapping[e]
						}).join(", ")
					);
					break;
				case 'belongsTo':
					errMsg.push("The key conflicts with " + err.key + "* in the following project(s): " +
						err.match.map(function(e){
							return projectMapping[e]
						}).join(", ")
					);
					break;
				case 'emptyfield':
					errMsg.push("The following field(s) are required: " +
						err.match.map(function(e){
							return '"' + e + '"'
						}).join(", ")
					);
					break;
				default:
					errMsg.push(err.type);
					break;
			}
		}

		cmp = (errMsg.length > 0) ? (<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
				{errMsg.map(function(e){
					return <p key={counter++}><Glyphicon glyph="alert"/> {e}</p>
				})}
			</Alert>) : null;

		return cmp;
	}
})

module.exports = AlertPanel
