const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const productsFilePath = path.join(__dirname, '../data/users.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersController={
    login: (req,res) => {
        res.render("login")
    },
    registro: (req,res) => {
        res.render("registro")
    }
}

module.exports=usersController