function adminLogueado(req,res,next){
    if(!req.session.usuariologueado||req.session.usuariologueado.rol_id!=1){
        return res.redirect('/users/login')
    }
    next()
}

module.exports=adminLogueado