import { SWITCH_LANG } from '../constants/ActionTypes'

export default function lang(state = "", action) {
	switch (action.type) {
		case SWITCH_LANG:
			return action.lang;
		default:
			return state;
	}
}
