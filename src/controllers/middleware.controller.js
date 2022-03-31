const JWT = require('jsonwebtoken')
const User = require('../models/user.model')

const middlewareController = {
	verifyToken: (req,res,next)=>{
		const token = req.headers.token
		if(token){
			acceptToken = token.split(' ')[1]
			JWT.verify(acceptToken, process.env.JWT_ACCEPT_KEY, (err, user)=>{
				if(err){
					res.status(403).json('Token của bạn không chính xác. Yêu cầu đăng nhập lại')
				}
				req.user = user
				next()
			})			
		}
		else{
			res.status(401).json("Không tìm thấy token của bạn. Yêu cầu đăng nhập lại")
		}
	},
	verifyTokenAndAdmin: (req,res,next)=>{
		middlewareController.verifyToken(req,res,()=>{
			if(req.user.id === req.params.id || req.user.admin){
				next()
			}
			else{
				res.status(403).json("Bạn không đủ quyền hạn cho chức năng trên")
			}
		})
	}
}

module.exports = middlewareController