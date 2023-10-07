let fs = require("fs")

function recordame(req,res,next){
    if(req.cookies.recordar != undefined && req.session.usuarioLoged == undefined){
        let usersJSON = fs.readFileSync("users.json",{errors : errors.errors})
        let users
        if (usersJSON == ""){
        users=[]
        } else {
        users = JSON.parse(usersJSON)
        }
        let usuariologin
        for (let i = 0; i < users.length; i++){
            if (users[i].email == req.cookies.recordar ) {
                let usuariologin = users[i]
                break;
            }
        }
        req.body.usuarioLoged = usuariologin
    }
    next()
}

module.exports = recordame