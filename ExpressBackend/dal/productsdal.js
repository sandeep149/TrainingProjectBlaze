const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = require('../api/dbConnection');

const productModel = require(path.join(__dirname, '../models/product'))(sequelize, Sequelize.DataTypes);

class ProductsDal {
    async getAllProducts(req, resp) {
        const searchStr = req.params['str'];
        const Op = Sequelize.Op;
        let qry = {};
        if (searchStr != "" && searchStr != undefined) {
            qry = { where: { productName: { [Op.like]: `%${searchStr}%` } } };
        }

        // console.log(qry);
        sequelize.sync({ force: false })
            .then(() =>
                productModel.findAll(qry))
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Data is Read Successfully',
                        rowCount: data.length,
                        rows: data
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
    // for vendor
    async getProductByVendorId(req, resp) {

        const vendorId = req.body.vendorId;
        if (vendorId == "" || vendorId == undefined) {
            resp.status(200)
                .send({
                    statusMessage: 'vendor id Is required',
                });
        }
        sequelize.sync({ force: false })
            .then(() =>
                productModel.findAll({
                    where: { vendorId: vendorId }
                }))
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Data is Read Successfully',
                        rowCount: data.length,
                        rows: data
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

    async getProductById(req, resp) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
                productModel.findOne({
                    where:
                        { productId: id }
                }))
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Data is Read Successfully',
                        rowCount: data.length,
                        rows: data
                    });
            })
            .catch((error) => {
                resp.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
            }
            )
    }

    addProduct(req, resp) {

        const objectToCreate = req.body;
        /* console.log(objectToCreate, req.file);
        return resp.send("hello"); */

        objectToCreate.productImg = req.file.filename;

        //console.log(objectToCreate, req.file);
        sequelize.sync({ force: false })
            .then(() => {
                return productModel.create(objectToCreate)
            })
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Record Added Successfully',
                        record: data
                    });
            })
            .catch((error) => {
                console.log(error.message);
                resp.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        errorDetails: error.message
                    });
            });
    }

    updateProductById(req, resp) {
        let id = parseInt(req.params.id);
        const objectToUpdate = req.body;
        sequelize.sync({ force: false })
            .then(() =>
                productModel.update({
                    productName: objectToUpdate.productName,
                    categoryId: objectToUpdate.categoryId,
                    price: objectToUpdate.price,
                    productImg: objectToUpdate.productImg,
                    productDescription: objectToUpdate.productDescription

                }, { where: { productId: id } })
            )
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Record Updated Successfully',
                        record: data
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
    deleteProductById(req, resp) {
        let id = parseInt(req.params.id);
        sequelize.sync({ force: false })
            .then(() =>
                productModel.destroy({
                    where:
                        { productId: id }
                }))
            .then((data) => {
                resp.status(200)
                    .send({
                        statusMessage: 'Data is Deleted Successfully'
                    });
            })
            .catch((error) => {
                resp.status(500)
                    .send({
                        statusMessage: 'Error Occured',
                        ErrorDetails: error.message
                    });
            });
    }

}

module.exports = ProductsDal;
