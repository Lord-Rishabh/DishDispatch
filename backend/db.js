const mongoose = require('mongoose');
const url = process.env.mongoUrl;

const connectToMongo = ()=>{
    try {
        mongoose.connect(url)
        console.log("Connected to Mongo Successfully");
    }
    catch {
        console.log("Database not connected ")
    }
}
module.exports = connectToMongo;