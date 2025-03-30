const { Connection, Request } = require('tedious');

// Configuration for the SQL Server connection
const config = {
    server: 'LAPTOP-0QQ7OVBA\SQLEXPRESS01', // Replace with your server name or IP
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // Replace with your SQL Server username
            password: 'mcl@1234', // Replace with your SQL Server password
        },
    },
    options: {
        database: 'buywithusapi', // Replace with your database name
        encrypt: true, // Use encryption for secure connection
        trustServerCertificate: true, // Set to true for self-signed certificates
    },
};

// Create a new connection
const connection = new Connection(config);

// Connect to the database
connection.on('connect', (err) => {
    if (err) {
        console.error('Connection failed:', err.message);
    } else {
        console.log('Connected to SQL Server successfully!');
        // You can execute queries here if needed
    }
});

// Handle connection errors
connection.on('error', (err) => {
    console.error('Connection error:', err.message);
});

// Export the connection for use in other modules
module.exports = connection;