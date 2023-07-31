const express = require("express")
const path = require("path")
const app = express()

app.use(express.static('public'))

app.listen(5000,() => (console.log("servidor abierto")))

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/home.html"))
})
app.get('/login',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/log-in.html"))
})