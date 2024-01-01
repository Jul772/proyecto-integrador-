import Card from "./Card/Card";
import getProducts from '../../services/productService.js'
import React from "react";
import { useState,useEffect } from "react";
import getUsers from '../../services/userService.js'

function RowMovies() {

  let [listado,setListado]=useState([])

  useEffect( ()=>{
    async function getItems (){
    const results=await getProducts('')
    let categories={
      name:'Cantidad de categorias',
      count:results.categories.length,
      color:'info',
      icon:"fas fa-tag"
    }
    let products={
      name:'Cantidad de productos',
      count:results.count,
      color:'success',
      icon:"fas fa-boxes"
    }
    const userArray = await getUsers()
    let users={
      name:'Cantidad de usuarios',
      count:userArray.count,
      color:'danger',
      icon:'fas fa-user'
    }
    setListado([products,categories,users])
  }
  getItems()
}
  ,[])

  return (
    <div className="row">

      {
        Array.isArray(listado) && listado.map((item, i) => (
        <Card key={i+item.name} titulo={item.name} cifra={item.count} 
        color={item.color} icono={item.icon}/>))
      }

    </div>
  )
}

export default RowMovies;