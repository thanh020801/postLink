const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const middlewareController = require('../controllers/middleware.controller')

router.post('/',middlewareController.verifyTokenAndAdmin,adminController.addProduct)
router.put('/:id',middlewareController.verifyTokenAndAdmin,adminController.updateProduct)
router.delete('/:id',middlewareController.verifyTokenAndAdmin,adminController.deleteProduct)

router.put('/user/:id',middlewareController.verifyTokenAndAdmin,adminController.updateUser)
router.delete('/user/:id',middlewareController.verifyTokenAndAdmin,adminController.deleteUser)
router.get('/user/',middlewareController.verifyTokenAndAdmin,adminController.viewAllUser)
module.exports = router