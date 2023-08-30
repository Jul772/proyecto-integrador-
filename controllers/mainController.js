const express=require('express')
const path=require('path')
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
    home: function(req,res){
        res.render('home',{products:products})
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
    },
    edit: (req,res) => {
        res.render("product-edit")
    }
}
module.exports = homeController