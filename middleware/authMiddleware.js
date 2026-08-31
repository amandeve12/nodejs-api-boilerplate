const jwt = require("jsonwebtoken")
require("dotenv").config()
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader ) return res.status(400).json({
            success: false,
            message: "Authentication failed",
        })

        const token = authHeader.split(" ")[1]
        console.log("Token:",token);

        const decoded = jwt.verify(token, process.env.SECRETE_KEY)

        req.user = decoded;
        next()

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware