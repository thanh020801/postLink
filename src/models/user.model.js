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
	// Tài khoản bị khóa
	block: {
		type: Boolean,
		default: false,
	},
	// Danh sách hàng trong giỏ chưa mua
	cart: {
		type: Array,
		default: []
	},
	// Danh sách hàng đã mua
	bought: {
		type: Array,
		default: []
	},
},{timestamps: true})

module.exports = mongoose.model("userSchema", userSchema)
