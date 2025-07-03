const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({
            status: 'error',
            message: 'Token format is wrong'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Token is invalid'
            });
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken
};