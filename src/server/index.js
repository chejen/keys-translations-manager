import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router'
import configureStore from '../store/configureStore'

export default function markup(initialState, renderProps){
	return renderToString(
		<Provider store={configureStore(initialState)}>
			<RouterContext {...renderProps} />
		</Provider>
	);
};
