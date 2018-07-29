import * as Status from './Status'

export const INIT_COMPONENTS = {
	reloaddata: false,
	showimportmodal: false,
	showmergemodal: false,
	showeditmodal: false,
	showconfirmmodal: false,
	showhistorymodal: false,
	showmessagepopup: false,
	showtooltip: false,
	tooltiptop: 0,
	tooltipleft: 0,
	keys: {},
	mergeable: [],
	editrecord: {},
	translationId: '',
};
export const INIT_SOCKET = {
	emitdatachange: false
};
export const INIT_COUNTS = {};
export const INIT_ERRORS = [];
export const INIT_MESSAGES = {
	lang: '',
	messages: {}
};
export const INIT_TRANSLATIONS = null;
export const INIT_HISTORY = {
	historylog: [],
	historystatus: Status.STATUS_FETCHED,
};
export const INIT_VIS = {
	treedata: null
};
