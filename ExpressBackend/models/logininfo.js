const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logininfo', {
    loginRowId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    loginId: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "loginId"
    },
    loginTime: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    logoutTime: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    userRowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userrole',
        key: 'userRowId'
      }
    }
  }, {
    sequelize,
    tableName: 'logininfo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "loginRowId" },
        ]
      },
      {
        name: "loginId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "loginId" },
        ]
      },
      {
        name: "fk_userRowId_in_userrole_table",
        using: "BTREE",
        fields: [
          { name: "userRowId" },
        ]
      },
    ]
  });
};
