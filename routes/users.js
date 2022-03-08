const router = require('express').Router();

const { getUser, getUsers } = require('../controllers/users');

router.use('/', getUsers);
router.use('/:id', getUser);

module.exports = router;