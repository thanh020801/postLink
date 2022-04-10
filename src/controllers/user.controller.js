const mongoose = require('mongoose')
const sha256 = require('sha256')
const JWT = require('jsonwebtoken')

const config = require('../config')
const Product = require('../models/product.model')
const User = require('../models/user.model')


const userController = {
	// Accept tokent
	generateAcceptToken: (user)=>{
		return JWT.sign(
			{
				id: user.id,
				admin: user.admin
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
				admin: user.admin
			},
			process.env.JWT_ACCEPT_KEY,
			{
				expiresIn: '30d',
			}
		)
	},
	// Tạo tài khoản
	register: async(req,res)=>{
		const hashed = await sha256(config.salt + req.body.password + config.salt)
		const uniqueUser = await User.findOne({username: req.body.username})
		if(uniqueUser){
			return res.status(300).json("Tài khoản này đã tồn tại")
		}else{
			const newUser = User({
				username: req.body.username,
				password: hashed,
			})
			const user = await newUser.save()
			if(!user){
				return res.status(404).json("Đăng ký không thành công")
			}
			return res.status(200).json(user)			
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
		const products =await Product.find()
		if(!products){
			return res.status(404).json("Không tìm thấy sản phẩm nào !!!")
		}
		return res.status(200).json(products)
	},
	viewDetail: async(req,res)=>{
		const product = await Product.findOne({id: req.params})
		if(!product){
			return res.status(404).json("Sản phẩm không tồn tại !!!")
		}
		return res.status(200).json(product)
	},
	cart: async(req,res)=>{
		res.send('cart')
	},

}

module.exports = userController