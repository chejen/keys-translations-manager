import * as ActionTypes from '../constants/ActionTypes'
import configUtil from '../configUtil'

export function loadTreeData(projectId) {
	return dispatch => {
		return fetch(configUtil.getHost() + `/api/vis/tree/${projectId}?t=${+new Date()}`)
			.then(res => {
				if (res.status >= 400) {
					throw new Error(res.status + ", " + res.statusText);
				}
				return res.json();
			})
			.then((result) => {
				dispatch({
					type: ActionTypes.LOAD_TREE_DATA,
					data: result
				})
			})
	}
}
