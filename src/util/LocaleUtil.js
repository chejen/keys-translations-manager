module.exports = {
	setMessages(messages) {
		this.messages = messages
	},
	getMsg(path) {
		const pathParts = path.split('.');
		let message;

		try {
			message = pathParts.reduce(function (obj, pathPart) {
				return obj[pathPart];
			}, this.messages);
		} finally {
			if (!message) {
				return path + ".undefined";
			}
		}

		return message;
	}
}
