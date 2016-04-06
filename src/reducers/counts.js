import { LOAD_COUNTS } from '../constants/ActionTypes'
import { INIT_COUNTS } from '../constants/InitStates'

export default function counts(state = INIT_COUNTS, action) {
	switch (action.type) {
		case LOAD_COUNTS:
			return action.counts
		default:
			return state;
	}
}
