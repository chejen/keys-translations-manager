import * as ActionTypes from '../constants/ActionTypes'
import configUtil from '../configUtil'

export function loadMessages(lang) {
	return dispatch => {
		fetch(configUtil.getHost() + '/public/locale/' + lang + '/translation.json')
			.then(res => {
				if (res.status >= 400) {
					throw new Error(res.status + ", " + res.statusText);
				}
				return res.json();
			})
			.then((messages) => {
				dispatch({
					type: ActionTypes.LOAD_MESSAGES,
					lang,
					messages
				})
			})
	}
}
