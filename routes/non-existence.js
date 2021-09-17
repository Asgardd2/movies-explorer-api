const router = require('express').Router();
const { sendMessageNonExistence } = require('../controllers/non-existence');

router.use('*', sendMessageNonExistence);

module.exports = router;
