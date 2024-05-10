const mongoose = require('mongoose');

const connectToMongo = ()=>{
    try {
        console.log(" &^& " + process.env.url);
        mongoose.connect(process.env.url)
        console.log("Connected to Mongo Successfully");
    }
    catch {
        console.log("Database not connected ")
    }
}
module.exports = connectToMongo;