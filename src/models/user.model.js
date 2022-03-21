const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		default: "Anonymus",
	},
	username: {
		type: String,
		require: true,
		minlength: 6,
		maxlength: 20,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		minlength: 8,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	block: {
		type: Boolean,
		default: false,
	},
	cart: {
		type: Array,
		default: []
	},
	bought: {
		type: Array,
		default: []
	},
},{timestamps: true})

module.exports = mongoose.model("userSchema", userSchema)
