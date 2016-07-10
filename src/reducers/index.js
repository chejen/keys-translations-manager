import { combineReducers } from 'redux'
import messages from './messages'
import counts from './counts'
import errors from './errors'
import translations from './translations'
import vis from './vis'
import socket from './socket'
import components from './components'

const rootReducer = combineReducers({
	messages, counts, errors, translations, vis, socket, components
})

export default rootReducer
