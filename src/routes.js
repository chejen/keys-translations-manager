import React from 'react'
import AppComponent from './App'
import RootContainer from './containers/RootContainer'
// import TablePanel from './containers/GridContainer'
import TablePanel from './components/grid/TablePanel'
const App = RootContainer(AppComponent)
const NoMatch = () => <div><h1>404</h1><br/>Not Found</div>

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
	require.ensure = (d, c) => c(require)
}

export default () => ({
	path: '/',
	component: App,
	indexRoute: {
		component: TablePanel
	},
	childRoutes: [{
		path: 'vis/:projectId',
		getComponent (nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('./containers/VisContainer').default)
			}, 'vis')
		}
	}, {
		path: '*',
		component: NoMatch
	}]
})
