const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console, error } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const {validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const cookieParser= require("cookie-parser")
const session = require("express-session")
const db=require('../database/models')

const usersController={
    login:  (req,res) => {
    res.render("login")
    },
    procesarlogin: async (req,res) => {
    let errors= validationResult(req)
    if(errors.isEmpty()){
        const {email,password}=req.body
        const user = await db.User.findOne({ where: { email } });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.usuarioLogeado = user;
            return res.render('perfil');
        } else {
            return res.render('login', {errorCredenciales:'Credenciales inválidas', old:req.body});
        } 
        }else {
            return res.render("login",{errors:errors.mapped(), old:req.body})
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