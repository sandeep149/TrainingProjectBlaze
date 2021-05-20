const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('manufacture', {
    manufactureRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    manufactureId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "manufactureId"
    },
    manufactureName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'manufacture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "manufactureRowId" },
        ]
      },
      {
        name: "manufactureId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "manufactureId" },
        ]
      },
    ]
  });
};
