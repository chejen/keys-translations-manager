import * as ActionTypes from '../constants/ActionTypes'

export function loadCounts() {
	return dispatch => {
		return fetch('api/count/projects')
			.then(res => {
				if (res.status >= 400) {
					throw new Error(res.status + ", " + res.statusText);
				}
				return res.json();
			})
			.then((result) => {
				let l = result.length,
					field = "_id",
					c,
					o = {};

				while(l--){
					c = result[l];
					o[c[field]] = c.count;
				}
				dispatch({
					type: ActionTypes.LOAD_COUNTS,
					counts: o
				})
			})
	}
}
