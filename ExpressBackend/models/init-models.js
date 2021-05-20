var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _customer = require("./customer");
var _logininfo = require("./logininfo");
var _manufacture = require("./manufacture");
var _payment = require("./payment");
var _product = require("./product");
var _rolemaster = require("./rolemaster");
var _userrole = require("./userrole");
var _users = require("./users");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var logininfo = _logininfo(sequelize, DataTypes);
  var manufacture = _manufacture(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var rolemaster = _rolemaster(sequelize, DataTypes);
  var userrole = _userrole(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  userrole.belongsTo(rolemaster, { as: "roleRow", foreignKey: "roleRowId"});
  rolemaster.hasMany(userrole, { as: "userroles", foreignKey: "roleRowId"});
  logininfo.belongsTo(userrole, { as: "userRow", foreignKey: "userRowId"});
  userrole.hasMany(logininfo, { as: "logininfos", foreignKey: "userRowId"});

  return {
    category,
    customer,
    logininfo,
    manufacture,
    payment,
    product,
    rolemaster,
    userrole,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
