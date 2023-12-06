const express=require('express')
const fs = require('fs');
const { validationResult } = require('express-validator');
const db=require('../database/models');

const productController = {
    index:function(req,res){
		db.Product.findAll({
            raw:true,
            include:[
                {association:'category'}
            ]
        })
			.then((products)=>
				res.render('index',{products:products})
				)

    },
    carrito: (req,res) => {
        res.render("carrito")
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
    update:(req,res)=>{
		let errors=validationResult(req)

		if(errors.isEmpty()){
			let imgAnterior=db.Product.findByPk(req.params.id)
			.then(imgAnterior=>{
				db.Product.update(
					{
						name:req.body.name,
						price:req.body.price,
						category:req.body.category,
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