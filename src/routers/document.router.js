const router = require('express').Router()
const documentController = require('../controllers/document.controller')

router.get('/', documentController.viewAll)
router.get('/addLink/', documentController.addLink)
router.delete('/deleteDocument/:id',documentController.deleteDocument)
router.delete('/deleteAllDocument', documentController.deleteAllDocument)
// router.put('/updateDocument/:id', documentController.updateDocument)

module.exports = router