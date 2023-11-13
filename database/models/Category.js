const Carrito = require("./Carrito")

module.exports=(sequelize,dataTypes)=>{
    const Category=sequelize.define(
        "Category",
        {
            id:{
                type:dataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type:dataTypes.STRING,
                allowNull:false
            }
        },
        {
            tableName:"categories",
            timestamps:false
        }
    )
    Category.associate=function(modelos){
        Category.hasMany(modelos.Product,{
            as:'product',
            foreignKey:'category_id'
        })
    }
    return Category
}