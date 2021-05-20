const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    usersId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "usersId"
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: "phone"
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usersId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usersId" },
        ]
      },
      {
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
    ]
  });
};
