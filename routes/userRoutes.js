const express = require('express');
const userController = require('../Controllers/authController'); // Assuming authController.js is in the same directory
const user = require('../models/user');
const { body, validationResult } = require('express-validator');

const router = express.Router();
// Route to get all users
router.post(
    '/',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('firstname').notEmpty().withMessage('First name is required'),
        body('lastname').notEmpty().withMessage('Last name is required'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            userController.create(req, res);
        } catch (error) {
            next(error); // Pass the error to the error-handling middleware
        }
    }
);

// // Route to get a single user by ID
// router.get('/:id', userController.getUserById);

// // Route to create a new user
// router.post('/', userController.createUser);

// // Route to update a user by ID
// router.put('/:id', userController.updateUser);

// // Route to delete a user by ID
// router.delete('/:id', userController.deleteUser);

module.exports = router;