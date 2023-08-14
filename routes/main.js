const homeController = require("../controllers/mainController")
let express = require('express')
let router = express.Router()

router.get("/", homeController.home)

router.get("/login",homeController.login)

module.exports = router