function antiLogin(req,res,next){
    if(req.session.usuariologueado){
        return res.redirect(`/users/perfil/${req.session.usuariologueado.id}`)
    }
    next()
}

module.exports=antiLogin