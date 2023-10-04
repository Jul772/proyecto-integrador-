const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult}=require('express-validator')
const bcrypt = require('bcrypt')




const usersController={
    login: async (req,res) => {
        const { user, password } = req.body;

    if (user === "admin" && password === "12345") {
      try {
        const passwordHash = await bcrypt.hash(password, 8);
        res.json({
          message: "Autenticación exitosa",
          passwordHash: passwordHash
        });
      } catch (error) {
        res.status(500).json({ message: "Error al hashear la contraseña" });
      }
    } else {
      res.json({ message: "Ingrese correctamente sus credenciales" });
    }
  
        //res.render("login")
       
    },
    // Muestra la vista del registro
    registro: (req,res) => {
        
        res.render("registro")
        
        
    },
    // Cargar datos de usuario al json
    saveUser: (req, res) => {
        let errors=validationResult(req)
        res.send(errors.mapped().firstName.msg) //Probando la variable errors

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