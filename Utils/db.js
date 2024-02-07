const Sequelize = require('sequelize');

const sequelize = new Sequelize('plutos', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;