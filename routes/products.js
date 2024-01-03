const productController = require("../controllers/productController")
const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const { body } = require("express-validator")
const validator=require('../middleware/validaciones')

const adminLogueado=require('../middleware/adminLogueado')
const userLogueado=require('../middleware/userLogueado')

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
   cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

router.get('/index',productController.index, usersController.user)

router.get("/create",adminLogueado,productController.create)
router.post('/create',upload.single('productImg'),validator.productsValidatorCreate,productController.store)


router.get("/carrito/:id",userLogueado,productController.carrito)
router.post("/carrito/:id",userLogueado,productController.addCarrito)

router.get("/detail/:id",productController.detail)

router.get("/edit/:id",adminLogueado,productController.edit)
router.put("/edit/:id",upload.single('productImg'),validator.productsValidatorUpdate, productController.update)

router.delete('/delete/:id',adminLogueado, productController.delete)

module.exports = router