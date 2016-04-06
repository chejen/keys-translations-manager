import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const createStoreWithMiddleware = compose(
		applyMiddleware(thunk),
		(typeof window !== "undefined" && window.devToolsExtension)
			? window.devToolsExtension()
			: f => f
)(createStore)

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState)

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer(nextReducer)
		})
	}
	return store
}
