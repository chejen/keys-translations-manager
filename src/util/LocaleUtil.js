module.exports = {
	setMessages(messages) {
		this.messages = messages
	},
	getMsg(path) {
		const pathParts = path ? path.split('.') : [""],
			len = arguments.length;
		let message, i;

		try {
			message = pathParts.reduce(function (obj, pathPart) {
				return obj[pathPart];
			}, this.messages);
		} finally {
			if (message) {
				for (i = 1; i < len; i++){
					message = message.replace(
						new RegExp("\\{" + i + "\\}", "gm"),
						arguments[i]
					);
				}
			} else {
				return path + ".undefined";
			}
		}

		return message;
	}
}
