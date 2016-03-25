import { combineReducers } from 'redux'
import messages from './messages'
import counts from './counts'

const rootReducer = combineReducers({
	messages, counts
})

export default rootReducer
