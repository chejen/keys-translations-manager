import * as ActionTypes from '../constants/ActionTypes'
import {INIT_ERRORS} from '../constants/InitStates'

export default function errors(state = INIT_ERRORS, action) {
	switch (action.type) {
		case ActionTypes.ALERT_ERRORS:
			return action.errors;
		case ActionTypes.LOAD_MESSAGES:
		case ActionTypes.LOAD_COUNTS:
		case ActionTypes.SHOW_EDITMODAL:
		case ActionTypes.CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
}
