const mongoose = require('mongoose')
const sha256 = require('sha256')

const config = require('../config')
const Product = require('../models/product.model')
const User = require('../models/user.model')


const userController = {
	// Tạo tài khoản
	register: async(req,res)=>{
		const hashed = await sha256(config.salt + req.body.password + config.salt)
		const newUser = User({
			name: req.body.name,
			username: req.body.username,
			password: hashed,
		})
		const user = await newUser.save()
		if(!user){
			res.status(404).json("Đăng ký không thành công")
		}
		res.status(200).json(user)
	},

	// Đăng nhập
	login: async(req,res)=>{
		const user = await User.findOne({username: req.body.username})
		if(!user){
			res.status(404).json("Tài khoản không tồn tại !!!")
		}
		const hashed = await sha256(config.salt + req.body.password + config.salt)
		const isValidPassword = (user.password === hashed) ? true:false
		if(!isValidPassword){
			res.status(404).json("Mật khẩu không chính xác !!!")
		}
		if(user && isValidPassword){
			res.cookie("admin",user.admin)
			const {password, ...other} = user
			res.status(200).json(user)
		}
	},
	viewAll: async(req,res)=>{
		const products =await Product.find()
		if(!products){
			res.status(404).json("Không tìm thấy sản phẩm nào !!!")
		}
		res.status(200).json(products)
	},
	viewDetail: async(req,res)=>{
		const product = await Product.findOne({id: req.params})
		if(!product){
			res.status(404).json("Sản phẩm không tồn tại !!!")
		}
		res.status(200).json(product)
	},
	cart: async(req,res)=>{
		res.send('cart')
	},

}

module.exports = userController