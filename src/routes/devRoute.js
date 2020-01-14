const { Router } = require('express');
const devController = require('../controllers/devController');

const router = Router();

router.post('/', devController.store);

router.get('/', devController.index);

module.exports = router;