const mongoose = require('mongoose')

const document = mongoose.Schema({
	title: {
		type: String,
		default: "",
	},
	content: {
		type: String,
		default: "",
	},
	code: {
		type: String,
		default: "",
	},


},{timestamps: true})

module.exports = mongoose.model("document", document)
