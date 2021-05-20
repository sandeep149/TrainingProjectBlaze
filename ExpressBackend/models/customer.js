const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customerRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "customerId"
    },
    customerName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customer',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customerRowId" },
        ]
      },
      {
        name: "customerId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customerId" },
        ]
      },
    ]
  });
};
