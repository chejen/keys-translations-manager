import { combineReducers } from 'redux'
import messages from './messages'
import counts from './counts'
import errors from './errors'
import translations from './translations'
import history from './history'
import vis from './vis'
import socket from './socket'
import components from './components'
import release from './release'

const rootReducer = combineReducers({
	messages, counts, errors, translations, history, vis, socket, components, release
})

export default rootReducer
