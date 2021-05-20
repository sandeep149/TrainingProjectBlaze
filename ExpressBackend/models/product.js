const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    productId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    productImg: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    productDescription: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    vendorId: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "productId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
};
