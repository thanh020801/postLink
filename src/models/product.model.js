const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	// Tên sản phẩm
	name: {
		type: String,
		require: true,
	},
	// Giá 
	price: {
		type: Number,
		require: true,
	},
	// Giảm giá
	discount: {
		type: Number,
		default: 0,
	},
	// Thương hiệu
	brand: {
		type: String,
		require: true,
	},
	// Phân loại
	kind: {
		type: String,
		require: true
	},
	// Nguồn gốc
	origin: {
		type: String,
		require: true,
		default: "Không rõ",
	},
	// Màu sắc
	color: {
		type: Array,
		require: true,
		default: []
	},
	// Chất liệu
	stuff: {
		type: String,
		default: "Không rõ",
	},
	// Kích thước 
	size: {
		type: Object,
		default: {}
	},
	// Đồ củ hay mới
	state: {
		type: String,
	},
	// Số lượng
	quantity: {
		type: Number,
		require: true
	}
},
{timestamps: true})

module.exports = mongoose.model("productSchema", productSchema)
