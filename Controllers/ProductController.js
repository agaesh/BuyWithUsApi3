const {sequelize,Product,Category} = require('../models');
const { Op } = require('sequelize'); // Import Sequelize operators
const queryString = require('qs'); // Import the query-string library
const { OFFSET } = require('tedious/lib/packet');


class ProductController{
    async getAllProducts(req, res) {
        try {
       
            const limit = parseInt(req.query.limit) || 50;
            const whereCondition = {};
            const ProductAttributes = await sequelize.getQueryInterface().describeTable("Products");
            const columnNames = Object.keys(ProductAttributes);
            const queryStringObj = queryString.parse(req.query);

            // Loop through query params and build dynamic filters
            for (const key in queryStringObj) {
                if (queryStringObj[key] && columnNames.includes(key)) {
                    let value = queryStringObj[key];

                    // Remove wrapping quotes if present
                    if (typeof value === "string") {
                        value = value.replace(/^['"]+|['"]+$/g, "");
                    }

                    // Optional: add partial match for specific fields
                    if (key === "product_name") {
                        whereCondition[key] = { [Op.iLike]: `%${value}%` };
                    } else {
                        whereCondition[key] = value;
                    }
                }
            }

            // Handle general search param (e.g., ?search=cola)
            if (req.query.search) {
                const search = req.query.search.toLowerCase();
                whereCondition.product_name = {
                    [Op.iLike]: `%${search}%`,
                };
            }

            // Fetch the products
            const products = await Product.findAll({
                where: whereCondition,
                limit: limit,
                include: {
                    model: Category,
                    as: "Category",
                    attributes: ["category_name"],
                },
            });

            if (!products || products.length === 0) {
                return res.status(404).json({ error: 'No products found' });
            }
            res.status(200).json(products);
            
        }
        catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getProductById(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findByPk(id, {
                include: {
                    model: Category,
                    as: 'Category', // must match the alias used in association
                    attributes: ['category_name']
                  }
            });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        }
        catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getProductByCategory(req, res, page, skip) {
        try {
            const categoryParam = req.params.category;
            const productName = req.params.product_name;

            const page = req.query.page ? parseInt(req.query.page, 10) : 1;  // Default to page 1
            const productsByCategory = await Product.findAll({
                include:{
                    model:Category,
                    as:'Category', 
                    attributes: ['category_name'],
                    where: {
                        category_name: {
                        [Op.like]: `%${categoryParam}%`
                    }
                },
                limits: page,
                offset: skip, // Skip the records for pag ination
            }})

            res.json(productsByCategory);
        }
        catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
module.exports = new ProductController();