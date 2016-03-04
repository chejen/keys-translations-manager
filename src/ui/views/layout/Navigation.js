import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from './Header'
import DropdownMenu from './DropdownMenu'
import SideBar from './SideBar'

const Navigation = React.createClass({
	mixins: [PureRenderMixin],

	render() {
		return(
			<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{"marginBottom": 0}}>
				<Header/>
				<DropdownMenu/>
				<SideBar/>
			</nav>
		);
	}
})

module.exports = Navigation
