import { LOAD_MESSAGES } from '../constants/ActionTypes'
import { INIT_MESSAGES } from '../constants/InitStates'

export default function messages(state = INIT_MESSAGES, action) {
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
