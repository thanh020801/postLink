const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	brand: {
		type: String,
		require: true,
	},
	kind: {
		type: String,
		require: true
	},
	origin: {
		type: String,
		require: true,
		default: "Không rõ",
	},
	color: {
		type: Array,
		require: true,
		default: []
	},
	stuff: {
		type: String,
		default: "Không rõ",
	},
	size: {
		type: Object,
		default: {}
	},
	state: {
		type: String,
	},
	quantity: {
		type: Number,
		require: true
	}
},
{timestamps: true})

module.exports = mongoose.model("productSchema", productSchema)
