import { SHOW_EDITMODAL, UPDATE_TRANSLATION, CLOSE_EDITMODAL } from '../constants/ActionTypes'
import { INIT_COMPONENTS } from '../constants/InitStates'

export default function components(state = INIT_COMPONENTS, action) {
	switch (action.type) {
		case SHOW_EDITMODAL:
			return {
				showeditmodal: true,
				editrecord: action.record
			};
		case UPDATE_TRANSLATION:
		case CLOSE_EDITMODAL:
			return {
				showeditmodal: false,
				editrecord: {}
			};
		default:
			return state;
	}
}
