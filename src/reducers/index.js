import { combineReducers } from 'redux'
import messages from './messages'
import counts from './counts'
import errors from './errors'
import translations from './translations'
import components from './components'

const rootReducer = combineReducers({
	messages, counts, errors, translations, components
})

export default rootReducer
