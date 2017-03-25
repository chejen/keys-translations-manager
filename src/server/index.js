import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureStore from '../store/configureStore'
import RootContainer from '../containers/RootContainer'

export default function markup(initialState, req, context){
	return renderToString(
		<Provider store={configureStore(initialState)}>
			<StaticRouter location={req.url} context={context}>
				<RootContainer/>
			</StaticRouter>
		</Provider>
	);
};
