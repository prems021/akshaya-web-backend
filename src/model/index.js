

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "ysgkin_akshaya",
  "ysgkin_admin",
  "Arshavin021#",
  {
    host: "ysgk.in",
    port: 3306,
    dialect: "mysql",
    define: {
      timestimps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tbl_Users = require("./users.js")(sequelize, Sequelize);
db.tbl_Plans = require("./plans.js")(sequelize, Sequelize);
db.tbl_Subscriptions = require("./subscriptions.js")(sequelize, Sequelize);



db.tbl_Users.hasOne(db.tbl_Subscriptions);
db.tbl_Subscriptions.belongsTo(db.tbl_Users);

db.tbl_Plans.hasMany(db.tbl_Subscriptions);
db.tbl_Subscriptions.belongsTo(db.tbl_Plans);



module.exports = db;
