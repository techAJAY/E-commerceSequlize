const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const multer = require('multer');



const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
 } else {
    cb('invalid image file!', false);
  }
};


  
const uploads = multer({ storage,fileFilter });




//product routes
router.post('/createProduct',productController.createProduct)
router.get('/getProduct/:id',productController.getOneProduct)
router.get('/getProduct',productController.getAllProduct)
router.put('/updateProduct/:id',productController.updateProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)

module.exports = router 