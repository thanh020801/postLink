const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		default: "",
	},
	lastName: {
		type: String,
		default: "",
	},
	company: {
		type: String,
		default: "",
	},
	email: {
		type:String,
		default: "",
	},
	city:{
		type: String,
		default: "",
	},
	country: {
		type: String,
		default: "",
	},
	address: {
		type: String,
		default: "",
	},
	phoneNumber:{
		type: String,
		default: "",
	},
	detail:{
		type: String,
		default: "",
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
