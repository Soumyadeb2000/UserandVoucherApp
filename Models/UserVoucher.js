const Sequelize = require('sequelize');

const sequelize = require('../Utils/db');

const UserVoucher = sequelize.define('UserVoucher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        required: true
    },
    voucherId: {
        type: Sequelize.INTEGER,
        required: true
    }
});

module.exports = UserVoucher;