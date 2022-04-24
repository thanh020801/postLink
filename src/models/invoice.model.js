const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
	// Tên người mua hàng
	name: {
		type: String,
		require: true,
	},
	// Địa chỉ
	address: {
		type: String,
		require: true,
	},
	phoneNumber: {
		type: String,
		require: true,
	},
	// Tổng giá tiền
	totalPrice: {
		type: Number,
		require: true,
	},

	// Danh sách hàng được mua: gồm 2 thành phần là sp và số lượng
	listItem: {
		type: Array,
		default: []
	},
},{timestamps: true})

module.exports = mongoose.model("invoiceSchema", invoiceSchema)

