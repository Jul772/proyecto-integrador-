const express = require("express")
const app = express()
const homeRutas=require('./routes/home.js')
const productsRutas = require('./routes/products.js')
const usersRutas=require('./routes/users.js')
const apiRutas = require('./routes/api.js')
const cookieParser= require("cookie-parser")
const methodOverride = require("method-override")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const recordame = require("./middleware/recordame")
const cors=require('cors')

app.use(cookieParser())
app.use(session({
    secret:"gitfit",
    resave:false,
    saveUninitialized:false,
}))
app.use(recordame)

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors())

const port=5000

app.listen(port,() => (console.log(`servidor abierto en http://localhost:${port}`)))

app.set('view engine','ejs')

app.use('/',homeRutas)

app.use('/products',productsRutas)

app.use('/users',usersRutas)

app.use('/api',apiRutas)

app.use(express.urlencoded({ extended:false }))
app.use(express.json())