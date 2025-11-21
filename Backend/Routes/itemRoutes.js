const express = require('express');
const router = express.Router();
const {createItem, updateItem, getItems,getItemById , deleteItem} = require('../Controllers/itemController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, createItem);
router.get('/', authenticate, getItems);
router.get('/:id', authenticate, getItemById);
router.put('/:id', authenticate, updateItem);
router.delete('/:id', authenticate, deleteItem);

module.exports = router;