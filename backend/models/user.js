const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true, unique: false}, 
    createdAt: {type: Date, default: Date.now}
})
const User = mongoose.model('User', userSchema);
module.exports = User