import { LOAD_HISTORY } from '../constants/ActionTypes'
import * as Status from '../constants/Status'
import configUtil from '../configUtil'

const setHistory = (status, historylog) => ({
	type: LOAD_HISTORY,
	status,
	historylog,
  });

export function loadHistory(translationId) {
	return dispatch => {
		dispatch(setHistory(Status.STATUS_FETCHING, []));
		return fetch(configUtil.getHost() + `/api/history/${translationId}?t=` + +new Date())
			.then(res => {
				if (res.status >= 400) {
					dispatch(setHistory(Status.STATUS_ERROR, []));
					throw new Error(res.status + ", " + res.statusText);
				}
				return res.json();
			})
			.then(result => {
				dispatch(setHistory(Status.STATUS_FETCHED, result ? result.logs : []));
			})
	}
}
