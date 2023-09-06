const express=require('express')
const path=require('path')
const fs = require('fs');
const { Console } = require('console');
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
        // let idProductoNuevo = 0

		// for(i=0;i<products.length;i++ ){
		// 	if(idProductoNuevo <= products[i].id){
		// 		idProductoNuevo++
		// 	}
		// }
		// idProductoNuevo++

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
            img:req.file.filename,
		}
		products.push(productoNuevo)
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null," "))
		res.redirect("/")
    },
    edit: (req,res) => {
        let productToEdit=products.find(producto => producto.id == req.params.id)
		res.render('product-edit',{productToEdit:productToEdit})
    },
    update:(req,res)=>{
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
		res.redirect("/")
    },

    delete: (req, res) => {
        let idProductDelete = parseInt(req.params.id); // Convierte el id a número
	
		let productoIndex = products.findIndex(product => product.id === idProductDelete);
	
		// Si se encuentra el producto, lo eliminamos usando splice
		products.splice(productoIndex, 1);
	
		// Escribe los cambios en el archivo JSON o en tu almacenamiento persistente.
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect('/');	
    }

}
module.exports = productController