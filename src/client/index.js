import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import configureStore from '../store/configureStore'
import RootContainer from '../containers/RootContainer'

if (__DEV__) {
	require('../../less/app.less');
}

ReactDOM.render(
	<Provider store={configureStore(window.__INITIAL_STATE__)}>
		<Router history={createBrowserHistory()}>
			<RootContainer/>
		</Router>
	</Provider>,
	document.getElementById('root')
);
