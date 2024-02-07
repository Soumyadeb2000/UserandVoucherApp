const User = require('../Models/Users');

const UserVoucher = require('../Models/UserVoucher');

const sequelize = require('../Utils/db');

exports.createUser = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { newUser } = req.body;
        const user = await User.create({ name: newUser.name, email: newUser.email, phone: newUser.phone });
        await t.commit();
        res.status(201).json({ user });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length > 0) {
            res.status(201).json({ users });
        } else {
            res.status(404).json({ msg: "No Users Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ msg: "User not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const { updateData } = req.body;
        const exists = await User.findOne({ where: { id: id } });
        console.log(exists);
        if (exists) {
            await User.update(updateData, { where: { id: id } });
            const updatedUser = await User.findByPk(id)
            res.status(200).json({ updatedUser });
            await t.commit();
        } else {
            res.status(404).json({ msg: "Voucher not Found" });
        }
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (user) {
            await User.destroy({ where: { id: id } });
            await UserVoucher.destroy({where: {userId: id}})
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