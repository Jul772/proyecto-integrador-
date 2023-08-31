const homeController = require("../controllers/mainController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
   cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

router.get('/products',homeController.index)

router.get("/create",homeController.create)
router.post('/create',upload.single('img-product'),homeController.store)

router.get("/carrito",homeController.carrito)

router.get("/product/:id",homeController.producto)

router.get("/registro",homeController.registro)

router.get("/login",homeController.login)

router.get("/",homeController.home)

router.get("/edit/:id",homeController.edit)
router.put("/edit/:id",upload.single('img-product'), homeController.update)

router.delete('/delete/:id', homeController.delete)

module.exports = router