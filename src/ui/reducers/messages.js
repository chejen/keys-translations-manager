import { LOAD_MESSAGES } from '../constants/ActionTypes'

export default function messages(state = {lang: '', messages: {}}, action) {
	switch (action.type) {
		case LOAD_MESSAGES:
			return {
				lang: action.lang,
				messages: action.messages
			};
		default:
			return state;
	}
}
