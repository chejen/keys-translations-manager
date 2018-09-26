'use strict';

module.exports = {
	/**
	 * result = {
	 *   key: {
	 *     // case 1: new value added
	 *     original: undefined,
	 *     addition: 'ui.common.edit',
	 *     deletion: undefined,
	 *
	 *     // case 2: no difference
	 *     // original: '', // or
	 *     original: 'ui.common.edit',
	 *     addition: undefined,
	 *     deletion: undefined,
	 *
	 *     // case 3: value modified
	 *     original: undefined,
	 *     addition: 'ui.common.modify',
	 *     deletion: 'ui.common.edit',
	 *
	 *     // case 4: value removed
	 *     original: undefined,
	 *     addition: undefined,
	 *     deletion: 'ui.common.modify',
	 *   }
	 * }
	 */
	differentiate: function(prevLog, log) {
		var result = {},
			key,
			prevValue,
			value;

		if (!log) {
			return false;
		}

		if (prevLog) {
			for (key in prevLog) {
				if (prevLog.hasOwnProperty(key)) {
					prevValue = prevLog[key];
					if (typeof result[key] === 'undefined') {
						result[key] = {};
					}
					if (log && log.hasOwnProperty(key)) {
						value = log[key];
						if (typeof prevValue !== 'object') { // string, number, ...
							if (prevValue === value) {
								result[key].original = prevValue;
							} else {
								result[key].deletion = prevValue;
								result[key].addition = value;
							}
						} else { // 'project' is an array
							// It doesn't matter that the arrays are mutated
							if (prevValue.sort().join(',') === value.sort().join(',')) {
								result[key].original = prevValue;
							} else {
								result[key].deletion = prevValue;
								result[key].addition = value;
							}
						}
					} else {
						result[key].deletion = prevValue;
					}
				}
			}
		}

		for (key in log) {
			if (log.hasOwnProperty(key)) {
				if (!prevLog || !prevLog.hasOwnProperty(key)) {
					if (typeof result[key] === 'undefined') {
						result[key] = {};
					}
					result[key].addition = log[key];
				}
			}
		}

		return result;
	}
}
