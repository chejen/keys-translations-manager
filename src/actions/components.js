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

export function showConfirmModal(record) {
	return {
		type: ActionTypes.SHOW_CONFIRMMODAL,
		record,
	}
}

export function closeConfirmModal() {
	return {
		type: ActionTypes.CLOSE_CONFIRMMODAL
	}
}

export function showHistoryModal(record) {
	return {
		type: ActionTypes.SHOW_HISTORYMODAL,
		record,
	}
}

export function closeHistoryModal() {
	return {
		type: ActionTypes.CLOSE_HISTORYMODAL
	}
}

export function closeMergeModal() {
	return {
		type: ActionTypes.CLOSE_MERGEMODAL
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

export function showMessagePopup() {
	return {
		type: ActionTypes.SHOW_MESSAGEPOPUP
	}
}

export function closeMessagePopup() {
	return {
		type: ActionTypes.CLOSE_MESSAGEPOPUP
	}
}

export function reloadData() {
	return {
		type: ActionTypes.RELOAD_DATA
	}
}

export function showTooltip(top, left) {
	return {
		type: ActionTypes.SHOW_TOOLTIP,
		top,
		left
	}
}

export function hideTooltip() {
	return {
		type: ActionTypes.HIDE_TOOLTIP
	}
}
