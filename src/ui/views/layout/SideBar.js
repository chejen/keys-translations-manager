import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const SideBar = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse nav">
					<ul className="nav" id="side-menu">
						<li className="sidebar-search">
							{/*<InputPanel/>*/}
							{this.props.children}
						</li>
						{/*<li>
							<a href="index.html">
								<i className="fa fa-dashboard fa-fw"></i> Dashboard
							</a>
						</li>*/}
					</ul>
				</div>
			</div>
		);
	}
})

module.exports = SideBar
