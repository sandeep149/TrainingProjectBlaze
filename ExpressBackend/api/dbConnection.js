const { Sequelize, DataTypes, Model, ValidationError } = require('sequelize');

const sequelize = new Sequelize('eshopping', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;