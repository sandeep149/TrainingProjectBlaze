const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../api/dbConnection')

var jwt = require('jsonwebtoken');

const usersModel = require(path.join(__dirname, '../models/users'))(sequelize, Sequelize.DataTypes);

class Auth {
    async login(req, resp) {
        const email = req.body.email;
        const password = req.body.password;
        //  console.log(req);
        sequelize.sync({ force: false })
            .then(() =>
                usersModel.findOne({ where: { email: email } }))
            .then(async (data) => {
                if (data == null) {
                    return resp.status(200)
                        .send({
                            statusMessage: 'Invalid email or paswword',
                            success: false
                        });
                }
                if (data.password != password) {
                    return resp.status(200)
                        .send({
                            statusMessage: 'Invalid email or paswword',
                            success: false
                        });
                }
                delete data.password;
                var token = await jwt.sign({ ...data }, 'ssshhh');
                resp.status(200)
                    .send({
                        statusMessage: 'Data is Read Successfully',
                        data: data,
                        token: token,
                        success: true
                    });
            })
            .catch((error) => {
                resp.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        errorDetails: error.message
                    });
            });
    }

}

module.exports = Auth;