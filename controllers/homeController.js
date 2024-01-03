const express=require('express')
const db=require('../database/models');

const homeController = {
    home: function(req,res){
        console.log(req.session.usuariologueado);
        db.Product.findAll({
            raw:true,
            include:[
                {association:'category'}
            ]
        })
            .then((products)=>{
                res.render('home',{products:products})
            })
    }
}

module.exports=homeController