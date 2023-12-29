const productController = require("../controllers/productController")
const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const { body } = require("express-validator")
const validator=require('../middleware/validaciones')

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
   cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

router.get('/index',productController.index, usersController.user)

router.get("/create",productController.create)
router.post('/create',upload.single('productImg'),validator.productsValidatorCreate,productController.store)

router.get("/carrito",productController.carrito)

router.get("/detail/:id",productController.detail)

router.get("/edit/:id",productController.edit)
router.put("/edit/:id",upload.single('productImg'),validator.productsValidatorUpdate, productController.update)

router.delete('/delete/:id', productController.delete)

module.exports = router