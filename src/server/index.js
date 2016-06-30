import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import container from '../container/container'
import AppComponent from '../App'
import configureStore from '../store/configureStore'
const App = container(AppComponent)

export default function markup(initialState){
	return renderToString(
		<Provider store={configureStore(initialState)}>
			<App/>
		</Provider>
	);
};
