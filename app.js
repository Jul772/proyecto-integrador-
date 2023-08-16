const express = require("express")
const app = express()
const mainRutas = require('./routes/main.js')
app.use(express.static('public'))

app.listen(5000,() => (console.log("servidor abierto")))

app.set('view engine','ejs')

<<<<<<< HEAD
app.use('/',homeRutas)

app.listen(5000,() => (console.log("servidor abierto")))
=======
app.use('/',mainRutas)
>>>>>>> ee9e084467f11152c3a4da759f05af71aed94563
