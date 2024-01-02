const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const {body, check}=require('express-validator')
const validator=require('../middleware/validaciones')

const antiLogin=require('../middleware/antiLogin')
const userLogueado=require('../middleware/userLogueado')

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
      cb(null, './public/images/users'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

router.get("/login",antiLogin,validator.usersValidatorLogin,usersController.login)
router.post("/login",validator.usersValidatorLogin,usersController.procesarlogin)

router.get("/registro",antiLogin,usersController.registro)
router.post('/registro',upload.single('avatar'), validator.usersValidatorRegister , usersController.saveUser)

router.get("/perfil/:id",userLogueado,usersController.user)

router.get('/logout',usersController.logout)

module.exports = router