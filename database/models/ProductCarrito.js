module.exports = (sequelize, dataTypes) => {
    const ProductCarrito = sequelize.define(
        "product_carrito",
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_carrito: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            id_product: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            cantidad: {
                type: dataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "product_carrito",
            timestamps: false  // Desactiva las columnas createdAt y updatedAt
        }
    );

    // ... otras asociaciones o métodos aquí

    return ProductCarrito;
};