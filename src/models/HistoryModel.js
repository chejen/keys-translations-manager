var mongoose = require('mongoose'),
	schema = {
		translationId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		logs: [{
			time: {
				type: Number,
			},
			action: {
				type: String,
				enum: ['ADD', 'EDIT', 'DELETE', 'IMPORT', 'MERGE'],
			},
			user: {
				type: String,
				trim: true,
			},
			translation: {
				type: Object,
			}
		}],
	},
	HistorySchema = new mongoose.Schema(schema);

module.exports = mongoose.model('History', HistorySchema);
