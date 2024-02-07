const express = require('express');

const app = express();

const sequelize = require('./Utils/db');

const userRoutes = require('./Routes/Users');

const voucherRoutes = require('./Routes/Vouchers');

const purchaseRoutes = require('./Routes/Purchase');

app.use(express.json());

app.use('/users',userRoutes);

app.use('/vouchers',voucherRoutes);

app.use('/purchase',purchaseRoutes);

sequelize.sync({force: false})
.then(() => {
    app.listen(3000);
}).catch((error) => {
    console.log(error);
})

module.exports = app;