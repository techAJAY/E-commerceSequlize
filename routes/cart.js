const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const {isAuth,userMiddleware,adminMiddleware} = require('../middleware/auth')


//cart routes
router.post('/addCart',cartController.addCart)
router.get('/getCart/:id',isAuth,cartController.getCart)
// router.get('/getUser',cartController.getAllUser)
// router.put('/updateUser/:id',cartController.updateUser)
router.delete('/deleteCart',cartController.deleteCart)

module.exports = router 