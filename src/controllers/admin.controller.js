const mongoose = require('mongoose')
const dotenv = require('dotenv')
const SHA256 = require('sha256')

const Product = require('../models/product.model')
const User = require('../models/user.model')
dotenv.config()

const adminController = {
	// Thêm mới một sản phẩm
	addProduct: async(req,res)=>{
		try{
			const newProduct = Product({
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				brain: req.body.brain,
				kind: req.body.kind,
				origin: req.body.origin,
				color: req.body.color,
				stuff: req.body.stuff,
				size: req.body.size,
				state: req.body.state,
				quantity: req.body.quantity,
				image: req.body.image,
			})
			const product = await newProduct.save()
			if(!product){
				return res.status(403).json("Thêm sản phẩm mới không thành công")
			}
			return res.status(200).json(product)		
		}catch(err){
			return res.status(500).json(err)
		}
	
	},

	// Cập nhật sản phẩm
	updateProduct: async(req,res)=>{
		try{
			const product = await Product.findByIdAndUpdate(
				req.params.id,req.body,{new: true}
			)
			if(!product){
				return res.status(403).json("Cập nhật không thành công")
			}
			return res.status(200).json(product)	
		}catch(err){
			return res.status(500).json(err)
		}
	
	},

	// Xóa sản phẩm
	deleteProduct: async(req,res)=>{
		try{
			const product = await Product.findByIdAndDelete(req.params.id)
			if(!product){
				return res.status(403).json("Không có sản phẩm")
			}		
			return res.status(200).text("Delete Successfully")	
		}catch(err){
			return res.status(500).json(err)
		}

		
	},

	// Xem danh sách user
	viewAllUser: async(req,res)=>{
		try{
			const users =await User.find()
			if(!users){
				return res.status(404).json("Không tìm thấy tài khoản nào")
			}
			return res.status(200).json(users)
		}catch(err){
			return res.status(500).json(err)
		}
	},

	// Truy xuất thay đổi thông tin người dùng
	updateUser: async(req,res)=>{
		try{
			const user = await User.findByIdAndUpdate(
				req.params.id,req.body,{new: true}
			)
			if(!user){
				return res.status(403).json("Cập nhật không thành công")
			}
			return res.status(200).json(user)		
		}catch(err){
			return res.status(500).json(err)
		}
	
	},
	// Xóa một user
	deleteUser: async(req,res)=>{
		try{
			const user = await User.findByIdAndDelete(req.params.id)
			if(!user){
				res.status(403).json("Không có quyền xóa")
			}
			res.status(200).json("Delete Successfully")		
		}catch(err){
			return res.status(500).json(err)
		}
	
	},
}

module.exports = adminController