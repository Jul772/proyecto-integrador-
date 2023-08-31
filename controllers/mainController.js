const express=require('express')
const path=require('path')
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
    home: function(req,res){
        res.render('home',{products:products})
    },
    login: (req,res) => {
        res.render("login")
    },
    carrito: (req,res) => {
        res.render("carrito")
    },
    registro: (req,res) => {
        res.render("registro")
    },
    producto: (req,res) => {
        res.render("product")
    },
    create: (req,res) => {
        res.render("create")
    },
    store:(req,res)=>{
        let idProductoNuevo = 0

		for(i=0;i<products.length;i++ ){
			if(idProductoNuevo < products[i].id){
				idProductoNuevo++
			}
		}
		idProductoNuevo = idProductoNuevo +1
		let productoNuevo={
			id:idProductoNuevo,
			name:req.body.name,
			price:req.body.price,
			discount:req.body.discount,
			category:req.body.category,
			description:req.body.description,
			image:req.file.filename
		}
		products.push(productoNuevo)
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "))
		res.redirect("/products")
    },
    edit: (req,res) => {
        res.render("product-edit")
    },
    update:(req,res)=>{
        let indexToEdit=products.findIndex(producto => producto.id == req.params.id)
		if (!req.file|| !req.file.mimetype.startsWith('image/')){
			res.redirect("/products/"+products[indexToEdit].id)
		}
		products[indexToEdit].name=req.body.name
		products[indexToEdit].price=req.body.price
		products[indexToEdit].category=req.body.category
		products[indexToEdit].description=req.body.description
		products[indexToEdit].discount=req.body.discount
		products[indexToEdit].image=req.file.filename
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "))
		res.redirect("/products")
    }

}
module.exports = homeController