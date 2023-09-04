const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
    home: function(req,res){
        res.render('home',{products:products})
    }
}

module.exports=homeController