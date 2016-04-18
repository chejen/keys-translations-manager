import * as ActionTypes from '../constants/ActionTypes'

export function showEditModal(record) {
	return {
		type: ActionTypes.SHOW_EDITMODAL,
		record: record
	}
}

export function closeEditModal() {
	return {
		type: ActionTypes.CLOSE_EDITMODAL
	}
}

export function showImportModal() {
	return {
		type: ActionTypes.SHOW_IMPORTMODAL
	}
}

export function closeImportModal() {
	return {
		type: ActionTypes.CLOSE_IMPORTMODAL
	}
}
