const User = require('../Models/Users');

const UserVoucher = require('../Models/UserVoucher');

const Voucher = require('../Models/Vouchers');

exports.buyVoucher = async (req, res) => {
    try {
        const { voucherId, userId } = req.body;
        const voucher = await Voucher.findOne({ where: { id: voucherId }});
        if (!voucher || !voucher.isValid) {
            res.status(404).json({ failed: 'Invalid Voucher Code' });
        } else {
            const user = await User.findOne({where: {id: userId*1}});
            if(user) {
                await UserVoucher.create({userId, voucherId})
                voucher.isValid = false;
                voucher.save();
                res.status(200).json({ success: 'Voucher added to User' });
            } else {
                res.status(404).json({ failed: 'User not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteVoucher = async (req, res) => {
    try {
        const { voucherId, userId } = req.body;
        const voucher = await Voucher.findOne({ where: { id: voucherId }, attributes: ['id','isValid']});
        if (!voucher || !voucher.isValid) {
            res.status(404).json({ failed: 'Invalid Voucher Code' });
        } else {
            const user = await User.findOne({where: {id: userId*1}, attributes: ['id']});
            if(user) {
                const userHasVoucher = UserVoucher.findOne({where: {userId, voucherId}})
                if(userHasVoucher) {
                    await UserVoucher.destroy({where: {userId, voucherId}});
                    res.status(200).json({ success: 'Voucher deleted for the user' });
                } else {
                    res.status(404).json({ failed: 'User doesn\'t have the voucher' });
                }
            } else {
                res.status(404).json({ failed: 'User not found' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getVouchers = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}, attributes: ['id']});
        if (!user) {
            res.status(404).json({ failed: 'Invalid User' });
        } else {
            const vouchersAndUsers = await UserVoucher.findAll({where: {userId: id}});
            res.status(200).json({vouchersAndUsers});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

