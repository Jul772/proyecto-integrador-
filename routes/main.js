const homeController = require("../controllers/mainController")
const express = require('express')
const router = express.Router()

router.get("/carrito",homeController.carrito)

router.get("/producto",homeController.producto)

router.get("/registro",homeController.registro)

router.get("/login",homeController.login)

router.get("/",homeController.home)

module.exports = router