const express = require("express")
const app = express()
const mainRutas = require('./routes/main.js')
app.use(express.static('public'))

app.listen(5000,() => (console.log("servidor abierto")))

app.set('view engine','ejs')

app.use('/',mainRutas)