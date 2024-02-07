const Voucher = require('../Models/Vouchers');

const sequelize = require('../Utils/db');

const excelData = require('./ExcelReader');

exports.createVoucher = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { newVoucher } = req.body;
        if (excelData.length > 0) {
            for (const voucher of excelData) {
                const exists = await Voucher.findOne({ where: { title: voucher.title } })
                if (!exists) {
                    await Voucher.create({ title: voucher.title, description: voucher.description, offerPrice: voucher.offerPrice, retailPrice: voucher.retailPrice, code: voucher.code })
                    await t.commit();
                }
            }
        }
        const voucher = await Voucher.create({ title: newVoucher.title, description: newVoucher.description, offerPrice: newVoucher.offerPrice, retailPrice: newVoucher.retailPrice, code: newVoucher.code });
        await t.commit();
        res.status(201).json({ voucher });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.getVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll();
        if (vouchers.length > 0) {
            res.status(200).json({ vouchers });
        } else {
            res.status(404).json({ msg: "No Voucher Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await Voucher.findByPk(id);
        if (voucher) {
            res.status(200).json({ voucher });
        } else {
            res.status(404).json({ msg: "Voucher not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateVoucher = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const { updateData } = req.body;
        const exists = await Voucher.findOne({ where: { id: id } });
        console.log(exists);
        if (exists) {
            await Voucher.update(updateData, { where: { id: id } });
            const updatedVoucher = await Voucher.findByPk(id)
            res.status(200).json({ updatedVoucher });
            await t.commit();
        } else {
            res.status(404).json({ msg: "Voucher not Found" });
        }
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}

exports.deleteVoucher = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const voucher = await Voucher.findByPk(id);
        if (voucher) {
            await Voucher.destroy({ where: { id: id } });
            await t.commit();
            res.status(200).json({success: "Deleted"});
        } else {
            await t.rollback();
            res.status(404).json({ msg: "Voucher not Found" });
        }
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}