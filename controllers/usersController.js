const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController={
    login: (req,res) => {
        res.render("login")
    },
    // Muestra la vista del registro
    registro: (req,res) => {
        res.render("registro")
    },
    // Cargar datos de usuario al json
    saveUser: (req, res) => {
        let ultimoId = 0;
		users.forEach((user) => {
			if (user.id > ultimoId) {
				ultimoId = user.id;
			}
		});

        // Nose si los campos vacios irian o no
        let newUser = {
            id: ultimoId + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            category: "cliente",
            image: "",
            fechaNacimiento: req.body.fechaNacimiento
        }

        users.push(newUser)
		fs.writeFileSync(usersFilePath,JSON.stringify(users,null," "))
		res.redirect("/")
    }
}

module.exports=usersController