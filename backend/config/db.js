// connection for mongoDb

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message || err);
        process.exit(1);
    }
};

module.exports = connectToDb;
