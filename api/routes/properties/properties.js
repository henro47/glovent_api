const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const properties_controller = require('../../controllers/properties/properties');

router.post('/', upload.single('image'), properties_controller.create_property);

router.get('/:id', properties_controller.get_single_property);
router.get('/',properties_controller.get_all_properties);

router.patch('/:id', properties_controller.update_property);

router.delete('/:id', properties_controller.remove_property);

module.exports = router;