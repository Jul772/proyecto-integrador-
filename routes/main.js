const homeController = require("../controllers/mainController")
const express = require('express')
const router = express.Router()

router.get('/', homeController.home)
router.get('/login',homeController.login)

module.exports = router