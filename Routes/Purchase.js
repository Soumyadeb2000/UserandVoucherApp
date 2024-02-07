const router = require('express').Router();

const purchaseControllers = require('../Controllers/Purchase');

router.post('/buy', purchaseControllers.buyVoucher);

router.delete('/delete', purchaseControllers.deleteVoucher);

router.get('/:id', purchaseControllers.getVouchers);

module.exports = router;

