const express=require('express')
const apiController=require('../controllers/apiController')
const { Model } = require('sequelize')

const router = express.Router()

router.get('/users',apiController.users)
router.get('/users/:id',apiController.user)

module.exports = router