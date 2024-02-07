const router = require('express').Router();

const voucherControllers = require('../Controllers/Vouchers');

router.get('/', voucherControllers.getVouchers);

router.get('/:id', voucherControllers.getVoucher);

router.post('/', voucherControllers.createVoucher);

router.delete('/:id', voucherControllers.deleteVoucher);

router.put('/:id', voucherControllers.updateVoucher);

module.exports = router;

