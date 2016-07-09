import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from '../store/configureStore'
import getRoutes from '../routes'

if (process.env.NODE_ENV === 'development') {
	require('../../less/app.less');
}

ReactDOM.render(
	<Provider store={configureStore(window.__INITIAL_STATE__)}>
		<Router history={browserHistory}>
			{getRoutes()}
		</Router>
	</Provider>,
	document.getElementById('root')
);
