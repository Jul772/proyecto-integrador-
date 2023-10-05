const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult}=require('express-validator')
const bcrypt = require('bcrypt')
const cookieParser= require("cookie-parser")

const usersController={
    login:  (req,res) => {
      res.render("login")


    },
    procesarlogin: (req,res) => {
        let errors= validationResult(req)
        if(error.isEmpty()){
            let usersJSON = fs.readFileSync("users.json",{errors : errors.errors})
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
                        let usuariologin= users[i]
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
            res.render("home")
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
        let errors=validationResult(req)
        res.res(errors) //Probando la variable errors

        //Código para poner cuando funcione :(
        /* if(errors.isEmpty()){
            let ultimoId = 0;
		users.forEach((user) => {
			if (user.id > ultimoId) {
				ultimoId = user.id;
			}
		});

        let newUser = {
            id: ultimoId + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            category: "cliente",
            image: req.file.filename,
            fechaNacimiento: req.body.fechaNacimiento
        }

        users.push(newUser)
		fs.writeFileSync(usersFilePath,JSON.stringify(users,null," "))
        res.redirect("/")
        } else {
            res.render('registro',{errors:errors.mapped(),old:req.body})
        } */
    },
    user: (req,res) => {
        let user=users.find(user => users.id == req.params.id)
        res.render("users", {user:user})
    }
}

module.exports=usersController