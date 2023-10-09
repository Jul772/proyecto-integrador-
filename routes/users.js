const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const {body, check}=require('express-validator')



const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
      cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

const validatoruser =[
   check("email").isEmail(),
   check("password").isLength({min:5}).withMessage("La contraseña debe tener al menos 5 caracteres")
]

const usersValidator=[
   body('firstName')
      .notEmpty()
      .withMessage('Debes agregar un nombre'),
   body('lastName')
      .notEmpty()
      .withMessage('Debes agregar un apellido'),
   body('username')
      .notEmpty()
      .withMessage('Debes agregar un nombre de usuario')
      .bail()
      .isLength({min:4})
      .withMessage('Tu nombre de usuario debe ser mas largo'),
   body('email')
      .notEmpty()
      .withMessage('Agrega un email por favor')
      .bail()
      .isEmail()
      .withMessage('Debes completar con un email valido'),
    body('password')
      .notEmpty()
      .withMessage('Agrega una contraseña')
      .bail()
      .isLength({min:6})
      .withMessage('Tu contraseña debe ser mas larga'),
    body('fechaNacimiento')
      .notEmpty()
      .withMessage('Agrega tu fecha de nacimiento'),
]

const validations = [
   body('firstName').notEmpty().withMessage('Debe escribir su nombre'),
   body('lastName').notEmpty().withMessage('Debe escribir su apellido'),
   body('username').notEmpty().withMessage('Debe escribir un nombre de usuario'),
   body('email')
      .notEmpty().withMessage('Tienes que escribir tu correo electronico').bail()
      .isEmail().withMessage('Por favor ingresa un correo valido'),
   body('password').notEmpty().withMessage('Debe escribir una contraseña'),
   body('fechaNacimiento').notEmpty().withMessage('Ingrese su fecha de Nacimiento'),
   body('avatar').custom((value, { req }) => {
      if (req.file) { // Verificar si se ha cargado un archivo
         let fileExtension = path.extname(req.file.originalname);
         let acceptedExtensions = ['.jpg', '.png'];
         if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
         }
      }
      // Si no se ha cargado un archivo, simplemente continúa sin errores.
      return true;
   })
]



router.get("/login",usersValidator,usersController.login)

router.post("/login",usersController.procesarlogin)

router.get("/registro",usersController.registro)

router.post('/registro',upload.single('avatar'), validations , usersController.saveUser)

router.get("/perfil/:id",usersController.user)

module.exports = router