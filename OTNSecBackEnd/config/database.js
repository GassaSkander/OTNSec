const mongoose = require('mongoose');
require('dotenv/config')

exports.connect = () => {
    mongoose.set('strictQuery', true);
    console.log("MongoDB URI:", process.env.DB); // Log MongoDB URI
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Successfully connected to MongoDB.");
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB.");
            console.error(error);
            process.exit(1);
        })
}