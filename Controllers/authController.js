const { Users } = require('../models'); // Importing the User model correctly
const argon2 = require('argon2'); // Import Argon2 for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token generation

class AuthController {
    // Create a new user
    async create(req, res) {
        try {
            const { firstname, lastname, email, password } = req.body;
            // Hash Password Before Storing
            const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
            // Create a New User
            const user = await Users.create({
                firstname,
                lastname,
                email,
                password: hashedPassword, // Store hashed password
            });

            if (!user) {
                return res.status(400).json({ success: false, message: 'User creation failed' });
            }

            // Send Response (Exclude Password for Security)
            res.status(201).json({
                success: true,
                message: 'User created successfully!',
                data: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                },
            });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    }

    async SignIn(req, res) {
        try {
            const { email, password } = req.body;

            // Find User by Email
            const user = await Users.findOne({ where: { email }, attributes: ['id', 'firstname', 'lastname', 'email', 'password'] });
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }

            // Verify Password
            const isPasswordValid = await argon2.verify(user.password, password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
            // Generate JWT Token
            const token = jwt.sign(
                { id: user.id, email: user.email }, // Payload
                process.env.JWT_SECRET, // Secret key
                { expiresIn: '1h' } // Token expiration
            );

            // Send Response (Exclude Password for Security)
            return res.status(200).json({
                success: true,
                message: 'User signed in successfully!',
                data: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                },
                token, // Send the token to the UI
            });

        } catch (error) {
            console.error("Error signing in user:", error);
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    }
}

module.exports = new AuthController;
