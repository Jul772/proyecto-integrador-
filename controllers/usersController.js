const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console, error } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const {validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const cookieParser= require("cookie-parser")
const session = require('express-session');
const db=require('../database/models')

const usersController={
    login:  (req,res) => {
    res.render("login")
    },
    procesarlogin: async (req, res) => {
        try {
            const correo = req.body.email;
            const contraseña = req.body.password;
            const btn = req.body.recordar
            const usuario = await db.User.findOne({ attributes: ['id', 'password'], where: { email: correo } });
    
            if (usuario) {
                const contraseñaValida = await bcrypt.compare(contraseña, usuario.password);
    
                if (contraseñaValida) {
                    req.session.usuariologueado = usuario.id
                    let usuario = req.session.usuariologueado
                    if (btn === true) {
                        res.cookie('recordame', cliente, { maxAge: 3600000});
                    }
                    res.redirect(`/users/perfil/${usuario.id}`);
                } else {
                    res.render("error", { mensaje: ERROR_CONTRASENA_INCORRECTA });
                }
            } else {
                res.render("error", { mensaje: "Correo no encontrado" });
            }
        } catch (error) {
            console.error('Error en procesarlogin:', error);
            res.render("error", { mensaje: "Error en el servidor" });
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