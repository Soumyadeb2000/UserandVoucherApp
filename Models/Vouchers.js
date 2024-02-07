const Sequelize = require('sequelize');

const sequelize = require('../Utils/db');

const Voucher = sequelize.define('Voucher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        required: true
    },
    offerPrice: {
        type: Sequelize.INTEGER,
        required: true
    },
    retailPrice: {
        type: Sequelize.INTEGER,
        required: true
    },
    code: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    }
});

module.exports = Voucher;