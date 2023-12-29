const usersController = require("../controllers/usersController")
const path=require('path')
const express = require('express')
const router = express.Router()
const multer = require("multer")
const {body, check}=require('express-validator')
const validator=require('../middleware/validaciones')

const storage = multer.diskStorage({ 
   destination: function (req, file, cb) {
      cb(null, './public/images/products'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({storage});

router.get("/login",validator.usersValidatorLogin,usersController.login)
router.post("/login",validator.usersValidatorLogin,usersController.procesarlogin)

router.get("/registro",usersController.registro)
router.post('/registro',upload.single('avatar'), validator.usersValidatorRegister , usersController.saveUser)

router.get("/perfil/:id",usersController.user)

module.exports = router