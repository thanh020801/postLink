const router = require('express').Router()
const userController = require('../controllers/user.controller')
const middlewareController = require('../controllers/middleware.controller')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.put('/:id/cart', userController.addProductTocart)
router.put('/:id/cart/delete', userController.deleteAProductToCart)
router.put('/:id/cart/deleteAll', userController.deleteAllProductToCart)
router.post('/cart/buy', userController.buy)

router.get('/', userController.viewAll)
router.get('/:id', userController.viewDetail)

module.exports = router