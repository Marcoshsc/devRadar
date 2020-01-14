const { Router } = require('express');
const SearchController = require('../controllers/searchController');

const router = Router();

router.get('/', SearchController.index);

module.exports = router;