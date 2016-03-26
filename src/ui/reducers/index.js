import { combineReducers } from 'redux'
import messages from './messages'
import counts from './counts'
import errors from './errors'

const rootReducer = combineReducers({
	messages, counts, errors
})

export default rootReducer
