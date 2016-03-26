import { SHOW_EDITMODAL, CLOSE_EDITMODAL } from '../constants/ActionTypes'

export function showEditModal(record) {
	return {
		type: SHOW_EDITMODAL,
		record: record
	}
}

export function closeEditModal() {
	return {
		type: CLOSE_EDITMODAL
	}
}
