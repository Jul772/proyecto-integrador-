let fs = require("fs")

function recordame (req,res,next) {
    if(req.cookies.recordar != undefined && req.session.usuarioLogeado == undefined){
        const {email,password}=req.body
        const user = db.User.findOne({ where: { email } });
        if (user){
            req.session.usuarioLogeado = user;
            ;
        }
    }
    next()
}

module.exports = recordame