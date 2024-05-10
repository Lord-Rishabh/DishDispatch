const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt_secret;
const User = require('../models/user');

const fetchuser = async (req, res, next) => {

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using correct token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);

        if (data.username !== req.params.restaurantUsername) {
            return res.status(401).send({ error: "Unauthorized. Invalid restaurant username" });
        }
        req.user = data.user;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        res.status(401).send({ error: "Please authenticate using correct token" })
    }
}

module.exports = fetchuser;