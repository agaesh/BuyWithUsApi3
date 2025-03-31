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

router.post("/signin", (req, res) => {
    // Logic for user sign-in
    res.send("User sign-in route");
    userController.SignIn(req, res);
});
router.post("/bank-details", (req, res) => {
    // Logic for adding bank details
    userController.addBankDetails(req, res);
});

router.get("/", (req, res) => {
    // Logic for getting all users
    userController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
    // Logic for getting a user by ID
    userController.getUserById(req, res);
});
router.put("/:id", (req, res) => {
    // Logic for updating a user by ID
    userController.updateUser(req, res);
});
router.delete("/:id", (req, res) => {
    // Logic for deleting a user by ID
    userController.deleteUser(req, res);
});


module.exports = router;