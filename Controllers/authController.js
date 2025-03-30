const { Users } = require('../models'); // Importing the User model correctly
const argon2 = require('argon2'); // Import Argon2 for password hashing

class AuthController {
    // Create a new user
    async create(req, res) {
        try {
            const { firstname, lastname, email, password } = req.body;

            // Validate Required Fields
          
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
}

module.exports = new AuthController;
