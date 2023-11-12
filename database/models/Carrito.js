module.exports = (sequelize, dataTypes) => {
    const Carrito = sequelize.define(
        "Carrito",
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "carrito",
            timestamps: false
        }
    );

    Carrito.associate = function (models) {
        Carrito.belongsToMany(models.Product, {
            as: 'productos_carrito',
            through: 'product_carrito',
            foreignKey: 'id_carrito',
            otherKey: 'id_producto'
        });
        Carrito.belongsTo(models.User,{
            as:'user',
            foreignKey:'user_id'
        })
    };

    return Carrito;
};
