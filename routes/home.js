const express=require('express')
const homeController = require("../controllers/homeController")

const path=require('path')
const router = express.Router()

router.get('/',homeController.home)

module.exports=router