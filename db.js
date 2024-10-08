const mongoose = require('mongoose');

// Update the MongoDB connection URI
const mongoURI = 'mongodb+srv://fearman99:fearman99@atlascluster.mrr1e.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

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
