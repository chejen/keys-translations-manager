import { SHOW_EDITMODAL, UPDATE_TRANSLATION, CLOSE_EDITMODAL } from '../constants/ActionTypes'

export default function components(state = {showeditmodal:false, editrecord:{}}, action) {
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
