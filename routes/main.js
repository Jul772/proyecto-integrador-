const homeController = require("../controllers/mainController")
const express = require('express')
const router = express.Router()
const multer = require("multer")

const uploadFile = multer({ storage });

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, '../public/images'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

router.post('/register', uploadFile.single('avatar'), usersController.create);

router.get("/carrito",homeController.carrito)

router.get("/producto",homeController.producto)

router.get("/registro",homeController.registro)

router.get("/login",homeController.login)

router.get("/",homeController.home)

module.exports = router