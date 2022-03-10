const router = require('express').Router();

const { getUser, getUsers } = require('../controllers/users');

router.use('/:id', getUser);
router.use('/', getUsers);

module.exports = router;