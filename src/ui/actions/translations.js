import * as ActionTypes from '../constants/ActionTypes'
import configUtil from '../configUtil'

export function addTranslation(params) {
	return dispatch => {
		fetch(configUtil.getHost() + '/api/translation', {
			headers: {
				'Accept': 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'POST',
			body: JSON.stringify(params)
		})
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then((result) => {
			if (result.success) {
				dispatch({
					type: ActionTypes.ADD_TRANSLATION,
					data: result.data
				})
			} else {
				dispatch({
					type: ActionTypes.ALERT_ERRORS,
					errors: result.errors
				})
			}
		})
	}
}

export function loadTranslations() {
	return dispatch => {
		fetch(configUtil.getHost() + '/api/translation')
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then((result) => {
			dispatch({
				type: ActionTypes.LOAD_TRANSLATIONS,
				data: result
			})
		})
	}
}

export function removeTranslation(id) {
	return dispatch => {
		fetch(configUtil.getHost() + '/api/translation/' + id, {
			method: 'DELETE'
		})
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then((data) => {
			dispatch({
				type: ActionTypes.REMOVE_TRANSLATION,
				id: data.id
			})
		})
	}
}

export function updateTranslation(params) {
	return dispatch => {
		fetch(configUtil.getHost() + '/api/translation/' + params._id, {
			headers: {
				'Accept': 'application/json; charset=utf-8',
				'Content-Type': 'application/json; charset=utf-8'
			},
			method: 'PUT',
			body: JSON.stringify(params)
		})
		.then(res => {
			if (res.status >= 400) {
				throw new Error(res.status + ", " + res.statusText);
			}
			return res.json();
		})
		.then((result) => {
			if (result.success) {
				dispatch({
					type: ActionTypes.UPDATE_TRANSLATION,
					data: result.data
				})
			} else {
				dispatch({
					type: ActionTypes.ALERT_ERRORS,
					errors: result.errors
				})
			}
		})
	}
}
