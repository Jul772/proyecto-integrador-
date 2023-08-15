const express=require('express')

const homeController = {
    home: function(req,res){
        res.render('home')
    },
    login: function(req,res){
        res.render('login')
    },
    registro: function(req,res){
        res.render('registro')
    }
}
module.exports = homeController