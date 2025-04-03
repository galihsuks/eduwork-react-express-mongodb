const sequelize = require("../../sequelize");
const { Sequelize, DataTypes } = require("sequelize");

const Products = sequelize.define(
    "Product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        // Other model options go here
    }
);

module.exports = Products;
