const express = require('express')
const router = express.Router()
const productController =   require('./product.controller');
// Retrieve all products
router.get('/', productController.getAll);
// create new product using POST
router.post('/', productController.create);
// Get a product by id
router.get('/:id', productController.findById);
// Update a product by id
router.put('/:id', productController.update);
// Delete a product by id
router.delete('/:id', productController.delete);

module.exports = router