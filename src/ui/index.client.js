import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import container from './container/container'
import AppComponent from './views/App.client'
import configureStore from './store/configureStore'
const App = container(AppComponent)
if (process.env.NODE_ENV === 'development') {
	require('../../less/app.less');
}

ReactDOM.render(
	<Provider store={configureStore()}>
		<App/>
	</Provider>,
	document.getElementById('root')
);
