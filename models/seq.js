const config = require("../config.js");
var Sequelize = require('sequelize');

var seq = new Sequelize(config.db, config.db_user, config.db_pass, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 500,
        min: 0,
        idle: 5000,
        acquire: 1000000,
        evict: 5000,
        handleDisconnects: true
    }
});

module.exports = seq;