const express = require("express")
const path = require("path")
const app = express()
let homeRutas = require('./routes/main')

app.use(express.static('public'))

app.set('views', __dirname +'/views')
app.set('view engine','ejs')

app.use('/',homeRutas)

app.listen(5000,() => (console.log("servidor abierto")))