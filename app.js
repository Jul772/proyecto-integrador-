const express = require("express")
const app = express()
const homeRutas=require('./routes/home.js')
const productsRutas = require('./routes/products.js')
const usersRutas=require('./routes/users.js')
const cookieParser= require("cookie-parser")
const methodOverride = require("method-override")
const bcrypt = require("bcryptjs")
const session = require("express-session")

var recordameMiddleware = require("./middleware/recordame")

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(cookieParser())
app.use(recordameMiddleware)

app.listen(5000,() => (console.log(`servidor abierto en http://localhost:5000`)))

app.set('view engine','ejs')

app.use('/',homeRutas)

app.use('/products',productsRutas)

app.use('/users',usersRutas)

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
