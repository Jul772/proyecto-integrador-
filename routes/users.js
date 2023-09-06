const usersController = require("../controllers/usersController")
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

router.get("/login",usersController.login)

router.get("/registro",usersController.registro)

router.post('/registro',upload.single('avatar'), usersController.saveUser)

module.exports = router