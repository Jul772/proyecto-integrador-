const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult}=require('express-validator')
const bcrypt = require('bcryptjs')
const cookieParser= require("cookie-parser")
const session = require("express-session")

const usersController={
    login:  (req,res) => {
      res.render("login")


    },
    procesarlogin: (req,res) => {
      let errors= validationResult(req)
      if(errors.isEmpty()){
          let usersJSON = fs.readFileSync("../data/users.json",{errors : errors.errors})
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
          res.render("users")
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
            password: bcrypt.hashSync(req.body.password,10)
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
    user: (req, res) => {
        let usuario = users.find(user => user.id == req.params.id);
        res.render("users", { user: usuario });
    }
    
}
module.exports = usersController