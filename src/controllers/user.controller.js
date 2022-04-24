const mongoose = require('mongoose')
const sha256 = require('sha256')
const JWT = require('jsonwebtoken')

const config = require('../config')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Invoice = require('../models/invoice.model')

const userController = {
	// Accept tokent
	generateAcceptToken: (user)=>{
		return JWT.sign(
			{
				id: user.id,
				// username : user.username,
				admin: user.admin,
			},
			process.env.JWT_ACCEPT_KEY,
			{
				expiresIn: '10h',
			}
		)
	},
	generateRefreshToken: (user)=>{
		return JWT.sign(
			{
				id: user.id,
				// username : user.username,
				admin: user.admin,
			},
			process.env.JWT_ACCEPT_KEY,
			{
				expiresIn: '30d',
			}
		)
	},
	// Tạo tài khoản
	register: async(req,res)=>{
		try{
			const hashed = await sha256(config.salt + req.body.password + config.salt)
			const uniqueUser = await User.findOne({username: req.body.username})
			if(uniqueUser){
				return res.status(300).json("Tài khoản này đã tồn tại")
			}else{
				const newUser = User({
					username: req.body.username,
					password: hashed,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					address: req.body.address,
					phoneNumber: req.body.phoneNumber,
				})
				const user = await newUser.save()
				if(!user){
					return res.status(404).json("Đăng ký không thành công")
				}
				return res.status(200).json(user)			
			}		
		}catch(err){
			return res.status(500).json(err)
		}
	},

	// Đăng nhập
	login: async(req,res)=>{
		try{
			const user = await User.findOne({username: req.body.username})
			if(!user){
				return res.status(404).json("Tài khoản không tồn tại !!!")
			}
			const hashed = await sha256(config.salt + req.body.password + config.salt)
			const isValidPassword = (user.password === hashed) ? true:false
			if(!isValidPassword){
				return res.status(404).json("Mật khẩu không chính xác !!!")
			}
			if(user && isValidPassword){
				const acceptToken = userController.generateAcceptToken(user)
				const refreshToken = userController.generateRefreshToken(user)
				// localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
				res.cookie("refreshToken", refreshToken,{
					httpOnly: true,
					secure:false,
					path: '/',
					sameSite: 'strict',
				})
				const {password, ...others} = user._doc
				return res.status(200).json({...others,acceptToken,refreshToken})
			}			
		}catch(err){
			return res.status(500).json(err)
		}

	},

	viewAll: async(req,res)=>{
		try{
			const products =await Product.find()
			if(!products){
				return res.status(404).json("Không tìm thấy sản phẩm nào !!!")
			}
			return res.status(200).json(products)		
		}catch(err){
			return res.status(500).json(err)
		}
	},

	viewDetail: async(req,res)=>{
		try{
			const product = await Product.findOne({id: req.params})
			if(!product){
				return res.status(404).json("Sản phẩm không tồn tại !!!")
			}
			return res.status(200).json(product)			
		}catch(err){
			return res.status(500).json(err)
		}
	},

	viewInvoice: async(req,res)=>{
		try{
			const invoice = await Invoice.find()
			if(!invoice){
				return res.status(404).json("Sản phẩm không tồn tại !!!")
			}
			return res.status(200).json(invoice)			
		}catch(err){
			return res.status(500).json(err)
		}
	},

	viewKind: async(req,res)=>{
		try{
			const product = await Product.find({kind: req.body.kind})
			if(!product){
				return res.status(404).json("Sản phẩm không tồn tại !!!")
			}
			return res.status(200).json(product)
		}catch(err){
			return res.status(500).json(err)
		}
	},

	addProductTocart: async(req,res)=>{
		try{
			// console.log(req.body)
			const user = 
			await User.findByIdAndUpdate(
				req.params.id,
				{$push:{cart: {item: req.body.item, checkBuy:true, quantityBuy: 1}}},
				// {cart:[]},
				{new: true})
			if(!user){
				return res.status(404).json("Thêm thất bại")
			}
			// console.log(user)
			const {password, ...others} = user._doc
			return res.status(200).json({...others})
		}catch(err){
			return res.status(500).json(err)
		}
	},
	deleteAProductToCart: async(req,res)=>{
		try{
			// console.log(req.body)
			const user = 
			await User.findByIdAndUpdate(
				req.params.id,
				{$pull:{cart: {item: req.body.item}}},
				// {cart:[]},
				{new: true})
			if(!user){
				return res.status(404).json("Thêm thất bại")
			}
			// console.log(user)
			const {password, ...others} = user._doc
			return res.status(200).json({...others})
		}catch(err){
			return res.status(500).json(err)
		}		
	},
	deleteAllProductToCart: async(req,res)=>{
		try{
			// console.log(req.body)
			const user = 
			await User.findByIdAndUpdate(
				req.params.id,
				{cart:[]},
				{new: true})
			if(!user){
				return res.status(404).json("Thêm thất bại")
			}
			// console.log(user)
			const {password, ...others} = user._doc
			return res.status(200).json({...others})
		}catch(err){
			return res.status(500).json(err)
		}		
	},
	buy: async(req,res)=>{
		try{
			const newInvoice = Invoice({
				name: req.body.name,
				address: req.body.address,
				totalPrice: req.body.totalPrice,
				listItem: req.body.listItem,
				phoneNumber: req.body.phoneNumber,
			})
			const invoice = await newInvoice.save()
			if(!invoice){
				return res.status(404).json("Mua thất bại")
			}
			return res.status(200).json(invoice)
		}catch(err){
			return res.status(500).json(err)
		}
	},
	deleteInvoice: async(req,res)=>{
		try{
			const invoice = await Invoice.deleteMany()
			if(!invoice){
				return res.status(403).json("Không có sản phẩm")
			}		
			return res.status(200).text("Delete Successfully")	
		}catch(err){
			return res.status(500).json(err)
		}
	},
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
}

module.exports = userController