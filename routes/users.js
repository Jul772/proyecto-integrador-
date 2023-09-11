const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const {check,body,validationResult}=require('express-validator')

const storage = multer.diskStorage({ 
destination: function (req, file, cb) {
cb(null, './public/images/products'); 
}, 
filename: function (req, file, cb) { 
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const usersValidator=[
    check('firstName').notEmpty().withMessage('Debes agregar un nombre').bail(),

    check('lastName').notEmpty().withMessage('Debes agregar un apellido').bail(),

    check('username').notEmpty().withMessage('Debes agregar un nombre de usuario').bail()
    .isLength({min:4}).withMessage('Tu nombre de usuario debe ser mas largo'),

    check('email').notEmpty().withMessage('Agrega un email por favor').bail()
    .isEmail().withMessage('Debes completar con un email valido'),

    check('password').notEmpty().withMessage('Agrega una contraseña').bail()
    .isLength({min:6}).withMessage('Tu contraseña debe ser mas larga'),

    check('fechaNacimiento').notEmpty().withMessage('Agrega tu fecha de nacimiento')
]

const upload = multer({storage});

router.get("/login",usersController.login)

router.get("/registro",usersController.registro)

router.post('/registro',usersValidator,upload.single('avatar'), usersController.saveUser)

module.exports = router