const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryName: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
    ]
  });
};
