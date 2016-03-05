import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const Header = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href="/">Keys-Translations Manager</a>
			</div>
		);
	}
})

module.exports = Header
