const productController = require("../controllers/productController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const { check } = require("express-validator")

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
   cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

let validatorRegister = [
   check("name")
      .notEmpty().withMessage("Debes completar el nombre")
      .isLength({min:5}).withMessage("el nombre debe tener almenos 5 caracteres"),
   check("price")
      .notEmpty().withMessage("Debes completar el precio"),
   check("description")
      .notEmpty().withMessage("Debes completar la descripción"),
   check("img-product")
      .notEmpty().withMessage("Debes subir una imagen")
]

const upload = multer({storage});

router.get('/index',productController.index)

router.get("/create",productController.create)
router.post('/create',validatorRegister,upload.single('img-product'),productController.store)

router.get("/carrito",productController.carrito)

router.get("/detail/:id",productController.detail)

router.get("/edit/:id",productController.edit)
router.put("/edit/:id",upload.single('img-product'), productController.update)

router.delete('/delete/:id', productController.delete)

module.exports = router