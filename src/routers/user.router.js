const router = require('express').Router()
const userController = require('../controllers/user.controller')
const middlewareController = require('../controllers/middleware.controller')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.put('/cart', userController.cart)

router.get('/', userController.viewAll)
router.get('/:id', userController.viewDetail)

module.exports = router