const userRouter = require('./user.router')
const adminRouter = require('./admin.router')


function router(app){
	app.use('/admin', adminRouter)
	app.use('/', userRouter)
	
}
module.exports = router