const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userrole', {
    userRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "userId"
    },
    roleRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rolemaster',
        key: 'roleRowId'
      }
    }
  }, {
    sequelize,
    tableName: 'userrole',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userRowId" },
        ]
      },
      {
        name: "userId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_roleRowId_in_rolemaster_table",
        using: "BTREE",
        fields: [
          { name: "roleRowId" },
        ]
      },
    ]
  });
};
