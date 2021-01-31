// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
      // Configure columns
      id:{
          type:DataTypes.INTEGER,
          allowNulls: false,
          primaryKey: true,
          autoIncrement: true
      },
      product_name:{
          type: DataTypes.STRING,
          allowNulls: false
      },
      price:{
          type: DataTypes.DECIMAL,
          allowNulls: false,
          validate:{
              isDecimal: true
          }

      },
      stock:{
          type: DataTypes.INTEGER,
          allowNulls: false,
          default:10,
          validate:{
              isInt: true
          }
      },
      category_id:{
          type: DataTypes.INTEGER,
          references:{
              model:"category",
              key: "id",
          }
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
