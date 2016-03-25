import { LOAD_COUNTS } from '../constants/ActionTypes'

export default function lang(state = {}, action) {
	switch (action.type) {
		case LOAD_COUNTS:
			return action.counts
		default:
			return state;
	}
}
