import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({message : "token required"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message : "invalid token"});
    }
};

module.exports = authMiddleware;
