const express = require("express")
const app = express()
const mainRutas = require('./routes/main.js')
app.use(express.static('public'))

app.listen(5000,() => (console.log("servidor abierto en el puerto 5000")))

app.set('view engine','ejs')

app.use('/',mainRutas)
