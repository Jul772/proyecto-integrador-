function header(req,res,next){
    console.log('se ejecuto header');

    res.locals.isLogged=false

    if(req.session&&req.session.usuariologueado){
        res.locals.isLogged=true
        res.locals.userLogged=req.session.usuariologueado
    }

    next()
}
module.exports=header