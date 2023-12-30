const express=require('express')
const db=require('../database/models');

const apiController= {
    users:(req,res)=>{
        db.User.findAll()
        .then(users=>{
            const usuariosAMostrar=users.map(user=>{
                return {
                    id:user.id,
                    name:`${user.firstName} ${user.lastName}`,
                    email:user.email,
                    detail:`http://localhost:5000/users/perfil/${user.id}`
                }
            })
            return res.json({
                count:usuariosAMostrar.length,
                data:usuariosAMostrar
            })
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            return res.json({ error: 'Error al buscar usuarios' });
        })
    },
    user:(req,res)=>{
        db.User.findByPk(req.params.id)
        .then(user=>{
            userSinInfoSensible={
                id:user.id,
                name:`${user.firstName} ${user.lastName}`,
                username:user.username,
                email:user.email,
                birthdate:user.birthdate,
                avatar:user.avatar
            }
            return res.json({
                data:userSinInfoSensible
            })
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            return res.json({ error: 'Error al buscar usuarios' });
        })
    },
    products:(req,res)=>{
        db.Product.findAll(
            {include:['category']}
        )
        .then(products=>{
            let productosPorCategoría={}
            products.forEach(product => {
                const categoryName = product.category ? product.category.name : 'Sin categoría';
        
                if (!productosPorCategoría[categoryName]) {
                productosPorCategoría[categoryName] = 1;
                } else {
                productosPorCategoría[categoryName]++;
                }
            });
            let productsPorMostrar=products.map(product=>{
                return {
                    id:product.id,
                    name:product.name,
                    description:product.description,
                    categories:[product.category.name],
                    detail:`http://localhost:5000/products/detail/${product.id}`
                }
            })
            return res.json({
                count:products.length,
                countByCategory:productosPorCategoría,
                data:productsPorMostrar
            })
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            return res.json({ error: 'Error al buscar usuarios' });
        })
    },
    product:(req,res)=>{
        db.Product.findByPk(req.params.id,{include:['category']})
        .then(product=>{
            let productoAMostrar={
                id: product.id,
                name:product.name,
                price: product.price,
                discount: product.discount,
                category:[product.category.name],
                img:`http://localhost:5000/images/products/${product.img}`,
                rating:product.rating,
                description:product.description,
            }
            res.json({
                data:productoAMostrar
            })
        })
        .catch(error => {
            console.error('Error al obtener producto:', error);
            return res.json({ error: 'Error al buscar producto' });
        })
    }
}


module.exports = apiController