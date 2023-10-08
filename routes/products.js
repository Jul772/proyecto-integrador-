const productController = require("../controllers/productController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const { body } = require("express-validator")

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
   cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

let productValidator = [
   body("name")
      .notEmpty().withMessage("Debes completar el nombre")
      .isLength({min:5}).withMessage("el nombre debe tener al menos 5 caracteres"),
   body('price')
      .notEmpty().withMessage("Debes completar el precio")
      .custom((value) => {
         if (parseFloat(value) <= 0) {
            throw new Error("El precio debe ser mayor que 0");
         }
         return true;
      }),
   body('discount')
      .notEmpty().withMessage("Debes completar el descuento")
      .isInt({ min: 1, max: 100 }).withMessage("El descuento debe estar entre 0 y 100"),
   body("description").notEmpty().withMessage("Debes completar la descripción"),
   body("category").notEmpty().withMessage("Debes poner una categoría"),
   body('productImg').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png'];
      
      if (!file) {
         throw new Error('Tienes que subir una imagen');
      } else {
         let fileExtension = path.extname(file.originalname);
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
         }
      }

      return true;
   })
]

const upload = multer({storage});

router.get('/index',productController.index)

router.get("/create",productController.create)
router.post('/create',upload.single('productImg'),productValidator,productController.store)

router.get("/carrito",productController.carrito)

router.get("/detail/:id",productController.detail)

router.get("/edit/:id",productController.edit)
router.put("/edit/:id",productValidator,upload.single('productImg'), productController.update)

router.delete('/delete/:id', productController.delete)

module.exports = router