const express = require('express');
const router = express.Router();
const properties_controller = require('../../controllers/properties/properties');

router.get('/',properties_controller.get_all_properties);

module.exports = router;