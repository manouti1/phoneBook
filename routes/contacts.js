const express = require('express');
const router = express.Router();
const contactController = require('../app/api/controllers/contacts');

router.get('/', contactController.getAll);
router.post('/', contactController.create);
router.post('/contact/populate/:id', contactController.userByContact);
router.get('/:contactId', contactController.getById);
router.put('/:contactId', contactController.updateById);
router.delete('/:contactId', contactController.deleteById);

module.exports = router;