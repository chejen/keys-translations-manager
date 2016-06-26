import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class Header extends React.Component {
	constructor() {
		super();
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return(
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href="https://github.com/chejen/keys-translations-manager">
					<i className="fa fa-github fa-fw fa-lg"/>
					{' '}
					Keys-Translations Manager
				</a>
			</div>
		);
	}
}
