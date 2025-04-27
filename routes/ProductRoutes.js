const express =  require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductController.js');

router.get('/', (req, res) => {// Extract the 'limit' parameter from the URL, parse it as an integer, or set a default value of 10
    const limit = parseInt(req.query.limit) || 50; // Default limit is 50
    ProductController.getAllProducts(req, res); 
}); // Get all products
router.get('/:category/:product_name?', (req, res) => {
     const limit = parseInt(req.query.limit) || 10;
     const page = parseInt(req.query.page) || 1; // Default page is 1
     const skip = (page - 1) * limit; // Calculate the number of records to skip
     const productName = req.params.name; // Extract the product name from the URL
     ProductController.getProductByCategory(req, res, page,skip); // Get product by name
}); // Get product by ID
module.exports = router;