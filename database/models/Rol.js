module.exports=(sequelize,dataTypes)=>{
    const Rol=sequelize.define(
        "Rol",
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
            tableName:"roles",
            timestamps:false
        }
    )
    Rol.associate=function(modelos){
        Rol.hasMany(modelos.User,{
            as:'user',
            foreignKey:'rol_id'
        })
    }
    return Rol
}