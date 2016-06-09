import * as ActionTypes from '../constants/ActionTypes'

export function findMergeable() {
	return dispatch => {
		return fetch('api/key')
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
