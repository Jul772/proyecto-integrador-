const homeController = require("../controllers/mainController")
const express = require('express')
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, '../public/images'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
})

const upload = multer({ storage:storage});

//router.post('/register', upload.single('avatar'), usersController.create);

router.get("/create",homeController.create)

router.get("/carrito",homeController.carrito)

router.get("/producto",homeController.producto)

router.get("/registro",homeController.registro)

router.get("/login",homeController.login)

router.get("/",homeController.home)

router.get("/edit",homeController.edit)

module.exports = router