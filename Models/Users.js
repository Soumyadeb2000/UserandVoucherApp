const Sequelize = require('sequelize');

const sequelize = require('../Utils/db');

const User = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        required: true
    },
    phone: {
        type: Sequelize.INTEGER,
        unique: true,
        required: true
    }
});

module.exports = User;