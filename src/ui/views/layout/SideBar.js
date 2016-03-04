import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Input from 'react-bootstrap/lib/Input'

const SideBar = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<div className="navbar-default sidebar" role="navigation">
				<div className="sidebar-nav navbar-collapse">
					<ul className="nav" id="side-menu">
						<li className="sidebar-search">
							<div className="input-group custom-search-form">
								<Input type="text" className="form-control" placeholder="Search..."/>
								<span className="input-group-btn">
								<button className="btn btn-default" type="button">
									<i className="fa fa-search"></i>
								</button>
							</span>
							</div>
						</li>
						<li>
							<a href="index.html">
								<i className="fa fa-dashboard fa-fw"></i> Dashboard
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
})

module.exports = SideBar
