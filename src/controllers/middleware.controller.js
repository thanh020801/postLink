const User = require('../models/user.model')

const middlewareController = {
	verify: async(req,res,next)=>{
		if(req.cookies.admin == 'true'){
			next()
		}
		else{
			return res.status(403).json("Bạn không có quyền của admin")
		}
	}
}

module.exports = middlewareController