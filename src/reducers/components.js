import * as ActionTypes from '../constants/ActionTypes'
import { INIT_COMPONENTS } from '../constants/InitStates'

export default function components(state = INIT_COMPONENTS, action) {
	switch (action.type) {
		case ActionTypes.SHOW_IMPORTMODAL:
			return {
				showimportmodal: true,
				editrecord: state.editrecord,
				showeditmodal: state.showeditmodal
			};
		case ActionTypes.CLOSE_IMPORTMODAL:
			return {
				showimportmodal: false,
				editrecord: state.editrecord,
				showeditmodal: state.showeditmodal
			};
		case ActionTypes.SHOW_EDITMODAL:
			return {
				showeditmodal: true,
				editrecord: action.record,
				showimportmodal: state.showimportmodal
			};
		case ActionTypes.UPDATE_TRANSLATION:
		case ActionTypes.CLOSE_EDITMODAL:
			return {
				showeditmodal: false,
				editrecord: state.editrecord,
				showimportmodal: state.showimportmodal
			};
		default:
			return state;
	}
}
