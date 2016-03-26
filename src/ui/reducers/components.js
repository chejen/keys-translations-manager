import { SHOW_EDITMODAL, CLOSE_EDITMODAL } from '../constants/ActionTypes'

export default function components(state = {showeditmodal:false, editrecord:{}}, action) {
	switch (action.type) {
		case SHOW_EDITMODAL:
		console.log("action.record", action.record);
			return {
				showeditmodal: true,
				editrecord: action.record
			};
		case CLOSE_EDITMODAL:
			return {
				showeditmodal: false,
				editrecord: {}
			};
		default:
			return state;
	}
}
