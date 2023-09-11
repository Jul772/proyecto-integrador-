const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {check,body,validationResult}=require('express-validator')



const usersController={
    login: (req,res) => {
        res.render("login")
    },
    // Muestra la vista del registro
    registro: (req,res) => {
        res.render("registro")
        let errors=validationResult(req)
    },
    // Cargar datos de usuario al json
    saveUser: (req, res) => {
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
    }
}

module.exports=usersController