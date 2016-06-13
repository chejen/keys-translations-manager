import * as ActionTypes from '../constants/ActionTypes'
import configUtil from '../configUtil'

export function findMergeable() {
	return dispatch => {
		return fetch(configUtil.getHost() + '/api/key?t=' + +new Date())
			.then(res => {
				if (res.status >= 400) {
					throw new Error(res.status + ", " + res.statusText);
				}
				return res.json();
			})
			.then((result) => {
				dispatch({
					type: ActionTypes.FIND_MERGEABLE,
					data: result
				})
			})
	}
}
