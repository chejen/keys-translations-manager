import { ALERT_ERRORS, CLEAR_ERRORS } from '../constants/ActionTypes'

export function alertErrors(errors) {
	return {
		type: ALERT_ERRORS,
		errors: errors
	}
}

export function clearErrors() {
	return {
		type: CLEAR_ERRORS,
		errors: []
	}
}
