const express = require("express")
const app = express()
const mainRutas = require('./routes/main.js')
const methodOverride = require("method-override")
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.listen(5000,() => (console.log("servidor abierto")))

app.set('view engine','ejs')

app.use('/',mainRutas)

app.use(express.urlencoded({ extended:false }))
app.use(express.json())
