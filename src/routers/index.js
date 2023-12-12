const documentRouter = require('./document.router')

function router(app){
	app.use('/', documentRouter)
}
module.exports = router