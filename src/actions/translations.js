import * as ActionTypes from '../constants/ActionTypes'
import configUtil from '../configUtil'

export function addTranslation(params) {
	return (dispatch, getState) => {
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/translation`, {
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
	return (dispatch, getState) => {
		// for showing mask
		dispatch({
			type: ActionTypes.LOAD_TRANSLATIONS,
			data: null
		})
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/translation?t=` + +new Date())
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
	return (dispatch, getState) => {
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/translation/` + id, {
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
	return (dispatch, getState) => {
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/translation/` + params._id, {
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

/* istanbul ignore next */
export function importLocale(params) {
	let data = new FormData()
	data.append('file', params.file)
	data.append('locale', params.locale)
	data.append('project', params.applyto)

	return (dispatch, getState) => {
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/import`, {
			method: 'POST',
			body: data
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
					type: ActionTypes.IMPORT_LOCALE,
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

export function mergeTranslations(params) {
	return (dispatch, getState) => {
		const { currentRelease } = getState().release;
		return fetch(configUtil.getHost() + `/api/${currentRelease}/key`, {
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
					type: ActionTypes.MERGE_TRANSLATIONS,
					data: result.data
				})
			}
		})
	}
}
