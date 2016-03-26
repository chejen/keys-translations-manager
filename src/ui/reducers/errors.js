import * as ActionTypes from '../constants/ActionTypes'

export default function errors(state = [], action) {
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
