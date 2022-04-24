const router = require('express').Router()
const userController = require('../controllers/user.controller')
const middlewareController = require('../controllers/middleware.controller')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.put('/product/:id', userController.updateProduct)
router.put('/:id/cart', userController.addProductTocart)
router.put('/:id/cart/delete', userController.deleteAProductToCart)
router.put('/:id/cart/deleteAll', userController.deleteAllProductToCart)
router.post('/cart/buy', userController.buy)
router.get('/invoice', userController.viewInvoice)
router.delete('/invoiceDelete', userController.deleteInvoice)
router.get('/kind',userController.viewKind)
router.get('/', userController.viewAll)
router.get('/:id', userController.viewDetail)


module.exports = router