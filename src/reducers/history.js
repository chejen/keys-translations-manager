import { SHOW_HISTORYMODAL, LOAD_HISTORY } from '../constants/ActionTypes'
import { INIT_HISTORY } from '../constants/InitStates'
import { STATUS_FETCHED } from '../constants/Status'

export default function history(state = INIT_HISTORY, action) {
	switch (action.type) {
		case SHOW_HISTORYMODAL:
		case LOAD_HISTORY:
			return {
				historylog: action.historylog || [],
				historystatus: action.status || STATUS_FETCHED,
			};
		default:
			return state;
	}
}
