import { LOAD_MESSAGES, ALERT_ERRORS, CLEAR_ERRORS } from '../constants/ActionTypes'

export default function errors(state = [], action) {
	console.log("test", state.lang, action.lang);
	switch (action.type) {
		case ALERT_ERRORS:
			return action.errors;
		case LOAD_MESSAGES:
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
}
