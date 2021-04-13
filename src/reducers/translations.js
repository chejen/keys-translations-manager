import * as ActionTypes from '../constants/ActionTypes'
import { INIT_TRANSLATIONS } from '../constants/InitStates'

export default function translations(state = INIT_TRANSLATIONS, action) {
	const getIndex = function(id) {
		return (state || []).map(function(e){
			return e._id;
		}).indexOf(id);
	};
	let index;

	switch (action.type) {
		case ActionTypes.ADD_TRANSLATION:
			state = state || []; //might be null
			return [action.data, ...state];

		case ActionTypes.LOAD_TRANSLATIONS:
		case ActionTypes.IMPORT_LOCALE:
		case ActionTypes.MERGE_TRANSLATIONS:
			return action.data;

		case ActionTypes.REMOVE_TRANSLATION:
			state = state || []; //might be null
			index = getIndex(action.id);
			return [...state.slice(0, index),
					...state.slice(index + 1)];

		case ActionTypes.UPDATE_TRANSLATION:
			state = state || []; //might be null
			index = getIndex(action.data._id);
			return [...state.slice(0, index),
					action.data,
					...state.slice(index + 1)];
		default:
			return state;
	}
}
