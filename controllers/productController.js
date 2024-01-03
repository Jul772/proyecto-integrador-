const express=require('express')
const fs = require('fs');
const { validationResult } = require('express-validator');
const db=require('../database/models');
const productController = {
    index:async function(req,res){
		let usuario = await db.User.findByPk(req.params.id)
		db.Product.findAll({
            raw:true,
            include:[
                {association:'category'}
            ]
        })
			.then((products)=>
				res.render('index',{products:products, user: usuario})
				)
    },
    carrito: (req,res) => {
		let products=[
			{
				name:'Proteina Platinum Whey Isolate X 2 Lbs Version DOYPACK - Star Nutrition - Vainilla',
				price:'29.99',
				img:'1702057635136_img_.png'
			}
		]
        res.render("carrito",
		{products:products})
    },
	addCarrito:(req,res)=>{
		const addToCarrito = async (idUsuario, idProducto) => {
			try {
				// Primero, verifica si el usuario tiene un carrito existente
				const carritoUsuario = await db.Carrito.findOne({
				where: { id_user: idUsuario },
				});
			
				if (!carritoUsuario) {
				  // Si el usuario no tiene un carrito, puedes crear uno
				const nuevoCarrito = await db.Carrito.create({
					id_user: idUsuario,
				});
			
				}
			
				// Ahora, puedes agregar el producto al carrito
				await carritoUsuario.addProductos_carrito(idProducto);
			
				console.log('Producto agregado al carrito con éxito.');
			} catch (error) {
				console.error('Error al agregar producto al carrito:', error);
			}
			};
		addToCarrito(req.body.idUsuario,req.body.idProducto)

		res.redirect('/products/carrito/'+req.session.usuariologueado.id)
	},
    detail: (req,res) => {
		db.Product.findByPk(req.params.id)
			.then(product=>{
				res.render("product",{product:product})
			})
    },
    create: (req,res) => {
        res.render("create")
    },
    store: async (req,res)=>{
		let errors=validationResult(req)

		if(!errors.isEmpty()){
			return res.render('create', {errors:errors.mapped(), old:req.body});
		}

		// En caso de no haber errores se guarda el producto

		const categoryName = req.body.category;
		let category = await db.Category.findOne({
			where: { name: categoryName }
		});
		const newProduct = await db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: category.id,
            description: req.body.description,
            img: req.file.filename
        });
		//esperamos a que el producto se cree antes de renderizar la vista
        if (newProduct) {
            res.redirect("/products/index");
        }
    },
    edit: (req,res) => {
		db.Product.findByPk(req.params.id)
			.then(productToEdit=>{
				res.render('product-edit',{productToEdit:productToEdit})
			})
    },
    update: (req,res)=>{
		let errors=validationResult(req)

		if(errors.isEmpty()){
			let imgAnterior=db.Product.findByPk(req.params.id)
			.then (async imgAnterior=>{
				const categoryName = req.body.category;
		let category = await db.Category.findOne({
			where: { name: categoryName }
		});
				db.Product.update(
					{
						name:req.body.name,
						price:req.body.price,
						category_id:category.id,
						description:req.body.description,
						discount:req.body.discount,
						img : req.file ? req.file.filename : imgAnterior.img
					},
					{
						where:{id:req.params.id}
					}
				).then(res.redirect("/products/index"))
			})

	} else { //si el validation result tiene errores
		let productToEdit=db.Product.findByPk(req.params.id)
			.then((productToEdit)=>{
				res.render('product-edit',{errors:errors.mapped(),old:req.body,productToEdit:productToEdit})
				}
			)
		}
    },


delete: async (req, res) => {
	try {
    const productToDelete = await db.Product.findOne({
    where: { id: req.params.id }
    });

    const productDeleted = await db.Product.destroy({
    where: { id: req.params.id }
    });

    if (productDeleted) {
    const imagePath = `./public/images/products/${productToDelete.img}`;
    fs.unlinkSync(imagePath);

    res.redirect('/products/index');
    }
	} catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send('Error al eliminar el producto');
	}
}


}
module.exports = productController