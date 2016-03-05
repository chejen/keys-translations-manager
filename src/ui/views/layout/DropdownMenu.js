import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

const Header = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<ul className="nav navbar-top-links navbar-right">
				<li className="dropdown">
					<a className="dropdown-toggle" data-toggle="dropdown" href="#">
						<i className="fa fa-language fa-fw fa-lg"></i>
						<i className="fa fa-caret-down"></i>
					</a>
					<ul className="dropdown-menu dropdown-user">
						<li><a href="#">
							<i className="fa fa-language fa-fw"></i> en-US
						</a></li>
						<li><a href="#">
							<i className="fa fa-language fa-fw"></i> zh-TW
						</a></li>
					</ul>
				</li>
			</ul>
		);
	}
})

module.exports = Header
