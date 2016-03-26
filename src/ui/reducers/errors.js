import { LOAD_MESSAGES, CLEAR_ERRORS } from '../constants/ActionTypes'

export default function lang(state = [], action) {
	console.log("test", state.lang, action.lang);
	switch (action.type) {
		case LOAD_MESSAGES:
		case CLEAR_ERRORS:
			return [];
		default:
			return state;
	}
}
