const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const db=require('../database/models');
const Category = require('../database/models/Category');




const homeController = {
    home: function(req,res){
        db.Product.findAll({raw:true})
            .then((products)=>{
                res.render('home',{products:products})
                console.log(products);
            })
    }
}

module.exports=homeController