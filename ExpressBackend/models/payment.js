const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payment', {
    paymentRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paymentId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "paymentId"
    },
    paymentMode: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'payment',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "paymentRowId" },
        ]
      },
      {
        name: "paymentId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "paymentId" },
        ]
      },
    ]
  });
};
