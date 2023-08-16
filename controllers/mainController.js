const express=require('express')

const homeController = {
    home: function(req,res){
        res.render('home')
    },
    login: (req,res) => {
        res.render("login")
    },
    carrito: (req,res) => {
        res.render("carrito")
    },
    registro: (req,res) => {
        res.render("registro")
    },
    producto: (req,res) => {
        res.render("product")
    }
}
module.exports = homeController