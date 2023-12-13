const mongoose = require('mongoose')

const document = mongoose.Schema({
	link:{
		type: String,
		default: "",
	}
})

module.exports = mongoose.model("document", document)
