import React from 'react'
import { Route, IndexRoute } from 'react-router'
//import TablePanel from './components/grid/TablePanel'
import TablePanel from './containers/GridContainer'
import container from './containers/RootContainer'
import AppComponent from './App'
const App = container(AppComponent)
const NoMatch = () => <div><h1>404</h1><br/>Not Found</div>
let Tree

if (process.env.CODE_SPLITTING) {
	//Tree = require('react-router-proxy?name=vis!./components/vis/Tree.js');
	Tree = require('react-router-proxy?name=vis!./containers/VisContainer');
} else {
	//Tree = require('./components/vis/Tree').default;
	Tree = require('./containers/VisContainer').default;
}

export default () => (
	<Route path="/" component={App}>
		<IndexRoute component={TablePanel}/>
		<Route path="vis/:projectId" component={Tree}/>
		<Route path="*" component={NoMatch}/>
	</Route>
)
