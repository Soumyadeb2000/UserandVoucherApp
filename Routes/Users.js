const router = require('express').Router();

const userControllers = require('../Controllers/Users');

router.get('/', userControllers.getUsers);

router.get('/:id', userControllers.getUser);

router.post('/', userControllers.createUser);

router.delete('/:id', userControllers.deleteUser);

router.put('/:id', userControllers.updateUser);

module.exports = router;

