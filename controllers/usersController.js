const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console, error } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const cookieParser= require("cookie-parser")
const session = require("express-session")
const db=require('../database/models')

const usersController={
    login:  (req,res) => {
    res.render("login")


    },
    procesarlogin: (req,res) => {
    let errors= validationResult(req)
    if(errors.isEmpty()){
        let usersJSON = fs.readFileSync("./data/users.json",{errors : errors.errors})
        let users
        if (usersJSON == ""){
            users=[]
        } else {
            users = JSON.parse(usersJSON)
        }
        let usuariologin
        for (let i = 0; i < users.length; i++){
            if (users[i].email == req.body.email ) {
                if (bcrypt.compareSync(req.body.password,users[i].password)){
                    let usuariologin = users[i]
                    break;
                }
            }

        }
        if (usuariologin == undefined) {
            return res.render("login",{errors : [
                {msg:"credenciales invalidas"}
            ]})
        }
        req.session.usuarioLogeado = usuariologin
        res.render("perfil")
    } else {
        return res.render("login",{errors : errors.errors})
    }
    },
    // Muestra la vista del registro
    registro: (req,res) => {
        res.render("registro")
    },
    // Cargar datos de usuario al json
    saveUser: (req, res) => {
        let errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.render('registro', {errors:errors.mapped(), oldData: req.body});
        } else {
            db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                rol_id:2,
                avatar: req.body.avatar,
                birthdate: req.body.birthdate
                })
                .then(res.redirect("/"))
        }
    },
    user: async (req, res) => {
        let usuario = await db.User.findByPk(req.params.id)
        if(usuario){
            res.render("users", { user: usuario });
        }
    }
    
}
module.exports = usersController