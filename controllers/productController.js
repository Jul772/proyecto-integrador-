const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    index:function(req,res){
        res.render('index',{products:products})
    },
    carrito: (req,res) => {
        res.render("carrito")
    },
    detail: (req,res) => {
        let product=products.find(producto => producto.id == req.params.id)
        res.render("product",{product:product})
    },
    create: (req,res) => {
        res.render("create")
    },
    store:(req,res)=>{
		let errors=validationResult(req)
		if(errors.isEmpty()){
		if(req.file&&req.file.mimetype.startsWith('image/')){
			let ultimoId = 0;
		products.forEach((product) => {
			if (product.id > ultimoId) {
				ultimoId = product.id;
			}
		});

		let productoNuevo={
			id:ultimoId + 1,
			name:req.body.name,
			price:req.body.price,
			discount:req.body.discount,
			category:req.body.category,
			description:req.body.description,
		}
			productoNuevo.img=req.file.filename
			products.push(productoNuevo)
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "))
		res.redirect("/products/index")
		} else { // si no se subió una imagen
			let errorImgMsg="Debes agregar una imagen del producto"
			//res.send(errorImgMsg)
			res.render('create',{errorImgMsg:errorImgMsg})
		}
		
		} else { //si el validation result tiene errores
			//res.send(errors)
			res.render('create',{errors:errors.mapped(),old:req.body})
		}
    },
    edit: (req,res) => {
        let productToEdit=products.find(producto => producto.id == req.params.id)
		res.render('product-edit',{productToEdit:productToEdit})
    },
    update:(req,res)=>{
		let errors=validationResult(req)
		if(errors.isEmpty()){
		if(req.file.mimetype.startsWith('image/')){
		
        let indexToEdit=products.findIndex(producto => producto.id == req.params.id)
		// if (!req.file|| !req.file.mimetype.startsWith('image/')){
		// 	res.redirect("/products/edit/"+products[indexToEdit].id)
        //     return
		// }
		products[indexToEdit].name=req.body.name
		products[indexToEdit].price=req.body.price
		products[indexToEdit].category=req.body.category
		products[indexToEdit].description=req.body.description
		products[indexToEdit].discount=req.body.discount
		products[indexToEdit].img = req.file ? req.file.filename : products[indexToEdit].img;

		// products[indexToEdit].img=req.file.filename
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "))
		res.redirect("/products/index")
	} else { // si no se subió una imagen
		let errorImgMsg="Debes agregar un formato de imagen valido"
		res.render('product-edit',{errorImgMsg:errorImgMsg})
	}
	
	} else { //si el validation result tiene errores
		let productToEdit=products.find(producto => producto.id == req.params.id) 
		if(req.file&&!req.file.mimetype.startsWith('image/')){ //Comprobación de que sea un archivo de imagen
			let errorImgMsg="Debes agregar un formato de imagen valido"
			res.render('product-edit',
			{errors:errors.mapped(),old:req.body,productToEdit:productToEdit,errorImgMsg:errorImgMsg})//En ese caso mando un error para la imagen
			} else {// Si es una imagen o el usuario no puso nada no se manda el error
			res.render('product-edit',
			{errors:errors.mapped(),old:req.body,productToEdit:productToEdit})
			}
		}
    },

    delete: (req, res) => {
        let idProductDelete = parseInt(req.params.id); // Convierte el id a número
	
		let productoIndex = products.findIndex(product => product.id === idProductDelete);
	
		// Si se encuentra el producto, lo eliminamos usando splice
		products.splice(productoIndex, 1);
	
		// Escribe los cambios en el archivo JSON o en tu almacenamiento persistente.
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect('/products/index');	
    }

}
module.exports = productController