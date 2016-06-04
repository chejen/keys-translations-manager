import * as ActionTypes from '../constants/ActionTypes'
import { INIT_COMPONENTS } from '../constants/InitStates'

export default function components(state = INIT_COMPONENTS, action) {
	switch (action.type) {
		case ActionTypes.SHOW_MESSAGEPOPUP:
			return {
				...state,
				showmessagepopup: true
			};
		case ActionTypes.LOAD_TRANSLATIONS:
		case ActionTypes.CLOSE_MESSAGEPOPUP:
			return {
				...state,
				showmessagepopup: false
			};
		case ActionTypes.SHOW_IMPORTMODAL:
			return {
				...state,
				showimportmodal: true
			};
		case ActionTypes.IMPORT_LOCALE:
		case ActionTypes.CLOSE_IMPORTMODAL:
			return {
				...state,
				showimportmodal: false
			};
		case ActionTypes.SHOW_EDITMODAL:
			return {
				...state,
				showeditmodal: true,
				editrecord: action.record
			};
		case ActionTypes.UPDATE_TRANSLATION:
		case ActionTypes.CLOSE_EDITMODAL:
			return {
				...state,
				showeditmodal: false
			};
		default:
			return state;
	}
}
