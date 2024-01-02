function userLogueado(req,res,next){
    if(!req.session.usuariologueado){
        return res.redirect('/users/login')
    }
    next()
}

module.exports=userLogueado