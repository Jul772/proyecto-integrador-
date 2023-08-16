const homeController = require("../controllers/mainController")
let express = require('express')
let router = express.Router()

router.get("/", homeController.home)

router.get("/login",homeController.login)

router.get("/carrito",homeController.carrito)

router.get("/producto",homeController.producto)

router.get("/registro",homeController.registro)

module.exports = router