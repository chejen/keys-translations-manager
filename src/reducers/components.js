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
		case ActionTypes.LOAD_TREE_DATA:
		case ActionTypes.CLOSE_MESSAGEPOPUP:
			return {
				...state,
				showmessagepopup: false,
				reloaddata: false
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
		case ActionTypes.FIND_MERGEABLE:
			return {
				...state,
				showmergemodal: true,
				keys: action.data.keys,
				mergeable: action.data.mergeable
			};
		case ActionTypes.MERGE_TRANSLATIONS:
		case ActionTypes.CLOSE_MERGEMODAL:
			return {
				...state,
				showmergemodal: false
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
		case ActionTypes.SHOW_HISTORYMODAL:
			return {
				...state,
				showhistorymodal: true,
				translationId: action.translationId,
			};
		case ActionTypes.CLOSE_HISTORYMODAL:
			return {
				...state,
				showhistorymodal: false
			};
		case ActionTypes.SHOW_CONFIRMMODAL:
			return {
				...state,
				showconfirmmodal: true,
				editrecord: action.record,
			};
		case ActionTypes.REMOVE_TRANSLATION:
		case ActionTypes.CLOSE_CONFIRMMODAL:
			return {
				...state,
				showconfirmmodal: false
			};
		case ActionTypes.RELOAD_DATA:
			return {
				...state,
				reloaddata: true
			};
		case ActionTypes.SHOW_TOOLTIP:
			return {
				...state,
				showtooltip: true,
				tooltiptop: action.top || 0,
				tooltipleft: action.left || 0
			};
		case ActionTypes.HIDE_TOOLTIP:
			return {
				...state,
				showtooltip: false
			};
		default:
			return state;
	}
}
