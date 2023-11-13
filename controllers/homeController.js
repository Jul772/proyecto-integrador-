const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const db=require('../database/models');

const homeController = {
    home: function(req,res){
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