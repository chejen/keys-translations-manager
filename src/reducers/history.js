import { LOAD_HISTORY } from '../constants/ActionTypes'
import { INIT_HISTORY } from '../constants/InitStates'

export default function history(state = INIT_HISTORY, action) {
	switch (action.type) {
		case LOAD_HISTORY:
			return {
				history: action.history,
				historystatus: action.status,
			};
		default:
			return state;
	}
}
