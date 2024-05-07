const mongoose = require('mongoose');

// Update the MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/mydatabase';

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, {
            // Increase the timeout for MongoDB operations
            serverSelectionTimeoutMS: 5000, // Adjust timeout value as needed
            socketTimeoutMS: 45000 // Adjust timeout value as needed
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectToMongo;
