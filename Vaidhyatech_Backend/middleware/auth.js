
import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(401).json({ message: "No authentication token, authorization denied." });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(401).json({ message: "Token verification failed, authorization denied." });

        req.user = verified.id; // Add user ID to the request for further use
        next();

    } catch (error) {
        res.status(500).json({ message: "Invalid token" });
    }
}

module.exports = auth; 
