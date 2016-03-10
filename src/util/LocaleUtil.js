module.exports = {
	setMessages(messages) {
		this.messages = messages
	},
	getMsg(path) {
		const pathParts = path ? path.split('.') : [""],
			len = arguments.length - 1;
		let message, i;

		try {
			message = pathParts.reduce(function (obj, pathPart) {
				return obj[pathPart];
			}, this.messages);
		} finally {
			if (message) {
				for (i = 0; i < len;){
					message = message.replace(
						new RegExp("\\{" + i + "\\}", "gm"),
						arguments[++i]
					);
				}
			} else {
				return path + ".undefined";
			}
		}

		return message;
	}
}
