const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rolemaster', {
    roleRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roleId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "roleId"
    },
    roleName: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rolemaster',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleRowId" },
        ]
      },
      {
        name: "roleId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
};
