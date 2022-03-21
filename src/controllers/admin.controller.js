const mongoose = require('mongoose')
const dotenv = require('dotenv')
const SHA256 = require('sha256')

const Product = require('../models/product.model')
const User = require('../models/user.model')
dotenv.config()

const adminController = {
	// Thêm mới một sản phẩm
	addProduct: async(req,res)=>{
		const newProduct = Product({
			name: req.body.name,
			price: req.body.price,
			brain: req.body.brain,
			kind: req.body.kind,
			origin: req.body.origin,
			color: req.body.color,
			stuff: req.body.stuff,
			size: req.body.size,
			state: req.body.state,
			quantity: req.body.quantity,
		})
		const product = await newProduct.save()
		if(!product){
			res.status(403).json("Thêm sản phẩm mới không thành công")
		}
		res.status(200).json(product)
	},

	// Cập nhật sản phẩm
	updateProduct: async(req,res)=>{
		const product = await Product.findByIdAndUpdate(
			req.params.id,req.body,{new: true}
		)
		if(!product){
			res.status(403).json("Cập nhật không thành công")
		}
		res.status(200).json(product)
	},

	// Xóa sản phẩm
	deleteProduct: async(req,res)=>{
		const product = await Product.findByIdAndDelete(req.params.id)
		if(!product){
			res.status(403).json("Không có quyền xóa")
		}
		res.status(200).json("Delete Successfully")
	},

	// Xem danh sách user
	viewAllUser: async(req,res)=>{
		try{
			const users =await User.find()
			if(!users){
				res.status(404).json("Không tìm thấy tài khoản nào")
			}
			res.status(200).json(users)
		}catch(err){
			res.status(500).json(err)
		}
	},

	// Truy xuất thay đổi thông tin người dùng
	updateUser: async(req,res)=>{
		const user = await User.findByIdAndUpdate(
			req.params.id,req.body,{new: true}
		)
		if(!user){
			res.status(403).json("Cập nhật không thành công")
		}
		res.status(200).json(user)
	},
	// Xóa một user
	deleteUser: async(req,res)=>{
		const user = await User.findByIdAndDelete(req.params.id)
		if(!user){
			res.status(403).json("Không có quyền xóa")
		}
		res.status(200).json("Delete Successfully")
	},
}

module.exports = adminController