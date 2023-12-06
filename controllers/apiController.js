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
            return res.json({
                data:user
            })
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
            return res.json({ error: 'Error al buscar usuarios' });
        })
    },
    products:(req,res)=>{

    },
    product:(req,res)=>{

    },
}


module.exports = apiController