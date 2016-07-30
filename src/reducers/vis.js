import * as ActionTypes from '../constants/ActionTypes'
import { INIT_VIS } from '../constants/InitStates'

export default function vis(state = INIT_VIS, action) {
	switch (action.type) {
		case ActionTypes.LOAD_TREE_DATA:
			return {
				...state,
				treedata: action.data
			};
		default:
			return state;
	}
}
