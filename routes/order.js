const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')


//order routes
router.post('/createOrder',orderController.createOrder)
router.get('/getOrder/:id',orderController.getOrder)
// router.get('/getUser',orderController.getAllUser)
// router.put('/updateUser/:id',orderController.updateUser)
//router.delete('/deleteCart/:id',orderController.deleteCart)

module.exports = router 