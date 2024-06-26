const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // id, product_id, tag_id
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true, 
      autoincrement: true, 
    }, 
    product_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'product',
        key: 'id', 
        unique: false, 
      }
    }, 
    tag_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'tag',
        key: 'id', 
        unique: false, 
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
