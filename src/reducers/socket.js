import * as ActionTypes from '../constants/ActionTypes'
import { INIT_SOCKET } from '../constants/InitStates'

export default function socket(state = INIT_SOCKET, action) {
	switch (action.type) {
		case ActionTypes.ADD_TRANSLATION:
		case ActionTypes.REMOVE_TRANSLATION:
		case ActionTypes.UPDATE_TRANSLATION:
		case ActionTypes.IMPORT_LOCALE:
			return {
				...state,
				emitdatachange: true
			};
		case ActionTypes.END_DATACHANGE:
			return {
				...state,
				emitdatachange: false
			};
		default:
			return state;
	}
}
