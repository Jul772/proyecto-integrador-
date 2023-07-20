const express = require("express")
const path = require("path")
const app = express()

app.listen(5000,() => (console.log("servidor abierto")))
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"/views/proyecto.html"))
})