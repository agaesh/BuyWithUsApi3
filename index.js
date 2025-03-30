const express =  require('express');
const db = require('./db'); // Assuming db.js is in the same directory
const app = express();
const PORT = 3000;
const userRoute = require('./routes/userRoutes'); // Assuming userRoutes.js is in the same directory

// Middleware to parse JSON
app.use(express.json());
// Check database connection

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the BuyWithUs API!');
});

app.use('/user', userRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} `);
    if (db) {
        console.log('Database connection successful');
    } else {
        console.error('Database connection failed');
    }
});