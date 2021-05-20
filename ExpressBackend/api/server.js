const express = require('express');
const cors = require('cors');
const path = require('path');
var jwt = require('jsonwebtoken');
var multer = require('multer');

// multer configuration
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../uploads');
    },
    filename: function (req, file, callback) {
        var arr = (file.originalname).split('.');
        // to change file name
        var extension = arr[arr.length - 1];
        callback(null, Date.now() + "." + extension);
    }
});
var upload = multer({ storage: storage }).single('image');

const { Sequelize, DataTypes, Model } = require('sequelize');


let instance = express();
instance.use(express.static(path.join(__dirname, "..", 'uploads')));

instance.use(express.urlencoded({ extended: false }));
instance.use(express.json());
instance.use(cors());

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



//login 
const Auth = require(path.join(__dirname, '../dal/logindal'));
const authobj = new Auth();

const verifyJWT = (req, resp, next) => {
    const token = req.headers["x-acess-token"];
    // console.log(token);
    if (!token) {
        //console.log("token req");
        resp.status(200)
            .send({
                statusMessage: 'Token Required',
                success: false
            });
    }
    else {
        jwt.verify(token, 'ssshhh', (error, decoded) => {
            if (error) {
                resp.status(200)
                    .send({
                        statusMessage: 'failed to authenticate token',
                        success: false
                    });
            }
            else {
                req.usersId = decoded.usersId;
                req.userName = decoded.userName;
                req.email = decoded.email;
                req.isAdmin = decoded.isAdmin;
                next();
            }


        })
    }
}

instance.post('/api/login', (req, resp) => {
    authobj.login(req, resp);

});

// api for product table

const productdal = require(path.join(__dirname, '../dal/productsdal'));
const product = new productdal();

instance.get('/api/product/:str?', product.getAllProducts)


instance.get('/api/product/:id', (req, resp) => {
    product.getProductById(req, resp);
});

instance.post('/api/productByVendorId', (req, resp) => {
    product.getProductByVendorId(req, resp);
});

instance.post('/api/product', verifyJWT, upload, (req, resp) => {
    product.addProduct(req, resp);

});

instance.put('/api/product/:id', verifyJWT, (req, resp) => {
    product.updateProductById(req, resp);
});

instance.delete('/api/product/:id', verifyJWT, (req, resp) => {
    product.deleteProductById(req, resp);
});

// // end for product api data



// api for users table
const usersModel = require(path.join(__dirname, '../models/users'))(sequelize, Sequelize.DataTypes);


instance.get('/api/users', (req, resp) => {
    sequelize.sync({ force: false })
        .then(() =>
            usersModel.findAll())
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
                    statusMessage: 'Error Occured in user',
                    errorDetails: error.message
                });
        });
});

instance.get('/api/users/:id', (req, resp) => {
    let id = parseInt(req.params.id);
    sequelize.sync({ force: false })
        .then(() =>
            usersModel.findOne({
                where:
                    { usersId: id }
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
        });
});

instance.post('/api/users', async (req, resp) => {
    // console.log("ertsd cbsd cb");
    const objectToCreate = req.body;
    // console.log(req.body);
    var emailcheck = await usersModel.findOne({ where: { email: req.body.email } });
    // console.log(emailcheck);
    // return resp.send("sdfsd");
    if (emailcheck != null) {
        return resp.status(200)
            .send({
                statusMessage: 'email id is already in use',
                success: false,
            });
    }
    sequelize.sync({ force: false })
        .then(() => {
            return usersModel.create(objectToCreate)
        })
        .then((data) => {
            resp.status(200)
                .send({
                    statusMessage: 'Record Added Successfully',
                    record: data,
                    success: true,
                });
        })
        .catch((error) => {
            resp.status(500)
                .send({
                    statusMessage: 'Error Occured',
                    errorDetails: error.message,
                    success: false
                });
        });
});

instance.put('/api/users/:id', (req, resp) => {
    let id = parseInt(req.params.id);

    const objectToUpdate = req.body;

    sequelize.sync({ force: false })
        .then(() =>
            usersModel.update({
                usersId: objectToUpdate.usersId,
                userName: objectToUpdate.userName,
                email: objectToUpdate.email,
                phone: objectToUpdate.phone,
                loginRowid: objectToUpdate.loginRowid
            }, { where: { usersId: id } })
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

});

instance.delete('/api/users/:id', (req, resp) => {
    let id = parseInt(req.params.id);
    sequelize.sync({ force: false })
        .then(() =>
            usersModel.destroy({
                where:
                    { usersId: id }
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
});
// end for users table


// //api for category table
// const categoryModel = require(path.join(__dirname, '../models/category'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/category', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             categoryModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/category/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             categoryModel.findOne({
//                 where:
//                     { categoryRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/category', (req, resp) => {
//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return categoryModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/category/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             categoryModel.update({
//                 categoryRowId: objectToUpdate.categoryRowId,
//                 categoryId: objectToUpdate.categoryId,
//                 categoryName: objectToUpdate.categoryName,
//             }, { where: { categoryRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/category/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             categoryModel.destroy({
//                 where:
//                     { categoryRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// //end for category table

// //api for customer table

// const customerModel = require(path.join(__dirname, '../models/customer'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/customer', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             customerModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/customer/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             customerModel.findOne({
//                 where:
//                     { customerRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/customer', (req, resp) => {
//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return customerModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/customer/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             customerModel.update({
//                 customerRowId: objectToUpdate.customerRowId,
//                 customerId: objectToUpdate.customerId,
//                 customerName: objectToUpdate.customerName,
//                 email: objectToUpdate.email,
//                 address: objectToUpdate.address,
//                 city: objectToUpdate.city,
//                 state: objectToUpdate.state,
//                 postalCode: objectToUpdate.postalCode,
//                 phone: objectToUpdate.phone,
//             }, { where: { customerRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/customer/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             customerModel.destroy({
//                 where:
//                     { customerRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

//end for customer table

// api for dispatch table
// const dispatchModel = require(path.join(__dirname, '../models/dispatch'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/dispatch', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             dispatchModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/dispatch/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             dispatchModel.findOne({
//                 where:
//                     { dispatchRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/dispatch', (req, resp) => {

//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return dispatchModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/dispatch/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             dispatchModel.update({
//                 dispatchRowId: objectToUpdate.dispatchRowId,
//                 dispatchId: objectToUpdate.dispatchId,
//                 dispatchDate: objectToUpdate.dispatchDate,
//                 tracking: objectToUpdate.tracking,
//                 orderRowId: objectToUpdate.orderRowId,
//                 productRowId: objectToUpdate.productRowId,
//             }, { where: { dispatchRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/dispatch/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             dispatchModel.destroy({
//                 where:
//                     { dispatchRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });
// end for dispatch api

// api for manufacture table

// const manufactureModel = require(path.join(__dirname, '../models/manufacture'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/manufacture', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             manufactureModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/manufacture/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             manufactureModel.findOne({
//                 where:
//                     { manufactureRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/manufacture', (req, resp) => {

//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return manufactureModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/manufacture/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             manufactureModel.update({
//                 manufactureRowId: objectToUpdate.manufactureRowId,
//                 manufactureId: objectToUpdate.manufactureId,
//                 manufactureName: objectToUpdate.manufactureName,
//                 city: objectToUpdate.city,
//                 email: objectToUpdate.email,
//                 phone: objectToUpdate.phone,
//             }, { where: { manufactureRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/manufacture/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             manufactureModel.destroy({
//                 where:
//                     { manufactureRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });
// end for manufacture table

// // api for orderdetails table
// const orderdetailsModel = require(path.join(__dirname, '../models/orderdetails'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/orderdetails', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             orderdetailsModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/orderdetails/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             orderdetailsModel.findOne({
//                 where:
//                     { orderDetailRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/orderdetails', (req, resp) => {

//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return orderdetailsModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/orderdetails/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             orderdetailsModel.update({
//                 orderDetailRowId: objectToUpdate.orderDetailRowId,
//                 orderDetailId: objectToUpdate.orderDetailId,
//                 billDate: objectToUpdate.billDate,
//                 orderRowId: objectToUpdate.orderRowId
//             }, { where: { orderDetailRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/orderdetails/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             orderdetailsModel.destroy({
//                 where:
//                     { orderDetailRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

//end for orderdetail api

// api for orers table
// const ordersModel = require(path.join(__dirname, '../models/orders'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/orders', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             ordersModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/orders/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             ordersModel.findOne({
//                 where:
//                     { orderRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/orders', (req, resp) => {

//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return ordersModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/orders/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             ordersModel.update({
//                 orderRowId: objectToUpdate.orderRowId,
//                 orderId: objectToUpdate.orderId,
//                 orderDate: objectToUpdate.orderDate,
//                 shipDate: objectToUpdate.shipDate,
//                 tracker: objectToUpdate.tracker,
//                 customerRowId: objectToUpdate.customerRowId,
//                 paymentRowId: objectToUpdate.paymentRowId,
//                 productRowId: objectToUpdate.productRowId
//             }, { where: { orderRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/orders/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             ordersModel.destroy({
//                 where:
//                     { orderRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });
// end for order table

// // api for payment table
// const paymentModel = require(path.join(__dirname, '../models/payment'))(sequelize, Sequelize.DataTypes);

// // instance.get('/api/payment', (req, resp) => {
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             paymentModel.findAll())
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.get('/api/payment/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             paymentModel.findOne({
// //                 where:
// //                     { paymentRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });

// // instance.post('/api/payment', (req, resp) => {

// //     const objectToCreate = req.body;
// //     sequelize.sync({ force: false })
// //         .then(() => {
// //             return paymentModel.create(objectToCreate)
// //         })
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Added Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.put('/api/payment/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);

// //     const objectToUpdate = req.body;

// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             paymentModel.update({
// //                 paymentRowId: objectToUpdate.paymentRowId,
// //                 paymentId: objectToUpdate.paymentId,
// //                 paymentMode: objectToUpdate.paymentMode
// //             }, { where: { paymentRowId: id } })
// //         )
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Updated Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });

// // });

// // instance.delete('/api/payment/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             paymentModel.destroy({
// //                 where:
// //                     { paymentRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Deleted Successfully'
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });

// //end for payment table


// // // api for rolemaster table
// // const rolemasterModel = require(path.join(__dirname, '../models/rolemaster'))(sequelize, Sequelize.DataTypes);

// // instance.get('/api/rolemaster', (req, resp) => {
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             rolemasterModel.findAll())
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.get('/api/rolemaster/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             rolemasterModel.findOne({
// //                 where:
// //                     { roleRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });

// // instance.post('/api/rolemaster', (req, resp) => {

// //     const objectToCreate = req.body;
// //     sequelize.sync({ force: false })
// //         .then(() => {
// //             return rolemasterModel.create(objectToCreate)
// //         })
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Added Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.put('/api/rolemaster/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);

// //     const objectToUpdate = req.body;

// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             rolemasterModel.update({
// //                 roleRowId: objectToUpdate.roleRowId,
// //                 roleId: objectToUpdate.roleId,
// //                 roleName: objectToUpdate.roleName
// //             }, { where: { roleRowId: id } })
// //         )
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Updated Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });

// // });

// // instance.delete('/api/rolemaster/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             rolemasterModel.destroy({
// //                 where:
// //                     { roleRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Deleted Successfully'
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });

// // // end for rolemaster table


// // // api for subcategory table
// // const subcategoryModel = require(path.join(__dirname, '../models/subcategory'))(sequelize, Sequelize.DataTypes);

// // instance.get('/api/subcategory', (req, resp) => {
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             subcategoryModel.findAll())
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.get('/api/subcategory/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             subcategoryModel.findOne({
// //                 where:
// //                     { subCategoryRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Read Successfully',
// //                     rowCount: data.length,
// //                     rows: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });

// // instance.post('/api/subcategory', (req, resp) => {

// //     const objectToCreate = req.body;
// //     sequelize.sync({ force: false })
// //         .then(() => {
// //             return subcategoryModel.create(objectToCreate)
// //         })
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Added Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });
// // });

// // instance.put('/api/subcategory/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);

// //     const objectToUpdate = req.body;

// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             subcategoryModel.update({
// //                 subCategoryRowId: objectToUpdate.subCategoryRowId,
// //                 subCategoryId: objectToUpdate.subCategoryId,
// //                 categoryRowId: objectToUpdate.categoryRowId
// //             }, { where: { subCategoryRowId: id } })
// //         )
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Record Updated Successfully',
// //                     record: data
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     errorDetails: error.message
// //                 });
// //         });

// // });

// // instance.delete('/api/subcategory/:id', (req, resp) => {
// //     let id = parseInt(req.params.id);
// //     sequelize.sync({ force: false })
// //         .then(() =>
// //             subcategoryModel.destroy({
// //                 where:
// //                     { subCategoryRowId: id }
// //             }))
// //         .then((data) => {
// //             resp.status(200)
// //                 .send({
// //                     statusMessage: 'Data is Deleted Successfully'
// //                 });
// //         })
// //         .catch((error) => {
// //             resp.status(500)
// //                 .send({
// //                     statusMessage: 'Error Occured',
// //                     ErrorDetails: error.message
// //                 });
// //         });
// // });
// // // end for subcategory table



// // api for userrole table
// const userroleModel = require(path.join(__dirname, '../models/userrole'))(sequelize, Sequelize.DataTypes);

// instance.get('/api/userrole', (req, resp) => {
//     sequelize.sync({ force: false })
//         .then(() =>
//             userroleModel.findAll())
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.get('/api/userrole/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             userroleModel.findOne({
//                 where:
//                     { userRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Read Successfully',
//                     rowCount: data.length,
//                     rows: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// instance.post('/api/userrole', (req, resp) => {

//     const objectToCreate = req.body;
//     sequelize.sync({ force: false })
//         .then(() => {
//             return userroleModel.create(objectToCreate)
//         })
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Added Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });
// });

// instance.put('/api/userrole/:id', (req, resp) => {
//     let id = parseInt(req.params.id);

//     const objectToUpdate = req.body;

//     sequelize.sync({ force: false })
//         .then(() =>
//             userroleModel.update({
//                 userRowId: objectToUpdate.userRowId,
//                 userId: objectToUpdate.userId,
//                 roleRowId: objectToUpdate.roleRowId
//             }, { where: { userRowId: id } })
//         )
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Record Updated Successfully',
//                     record: data
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     errorDetails: error.message
//                 });
//         });

// });

// instance.delete('/api/userrole/:id', (req, resp) => {
//     let id = parseInt(req.params.id);
//     sequelize.sync({ force: false })
//         .then(() =>
//             userroleModel.destroy({
//                 where:
//                     { userRowId: id }
//             }))
//         .then((data) => {
//             resp.status(200)
//                 .send({
//                     statusMessage: 'Data is Deleted Successfully'
//                 });
//         })
//         .catch((error) => {
//             resp.status(500)
//                 .send({
//                     statusMessage: 'Error Occured',
//                     ErrorDetails: error.message
//                 });
//         });
// });

// end for users table

instance.listen(9001, () => {
    console.log('server started on port 9001');
});


