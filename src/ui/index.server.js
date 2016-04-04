import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from './views/App'
import configureStore from './store/configureStore'

global.navigator = global.navigator || {};

export default renderToString(
	<Provider store={configureStore()}>
		<App/>
	</Provider>
);
