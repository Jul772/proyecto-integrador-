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

const upload = multer({storage});

router.get("/login",usersValidator,usersController.login)

router.post("/login",usersValidator,usersController.procesarlogin)

router.get("/registro",usersController.registro)

router.post('/registro',usersValidator,upload.single('avatar'), usersController.saveUser)

router.get("/perfil/:id",usersController.user)

module.exports = router