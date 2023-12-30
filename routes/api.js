const express=require('express')
const apiController=require('../controllers/apiController')
const { Model } = require('sequelize')

const router = express.Router()

router.get('/users',apiController.users)
router.get('/users/:id',apiController.user)
router.get('/products',apiController.products)
router.get('/products/:id',apiController.product)

module.exports = router