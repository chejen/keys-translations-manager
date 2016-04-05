import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import container from '../ui/container/container'
import AppComponent from './App'
import configureStore from '../ui/store/configureStore'
const App = container(AppComponent)

global.navigator = global.navigator || {};

export default renderToString(
	<Provider store={configureStore()}>
		<App/>
	</Provider>
);
