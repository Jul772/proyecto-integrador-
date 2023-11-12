module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false
            },
            price: {
                type: dataTypes.DECIMAL,
                allowNull: false
            },
            discount: {
                type: dataTypes.DECIMAL,
                defaultValue: 0
            },
            category_id: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            img: {
                type: dataTypes.STRING,
                allowNull: false
            },
            rating: {
                type: dataTypes.INTEGER,
                allowNull: false
            },
            description: {
                type: dataTypes.TEXT
            }
        },
        {
            tableName: "products",
            timestamps: false
        }
    );

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        });

        Product.belongsToMany(models.Carrito, {
            as: 'productos_carrito',
            through: 'product_carrito',
            foreignKey: 'id_producto',
            otherKey: 'id_carrito'
        });
    };

    return Product;
};