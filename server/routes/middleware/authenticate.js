const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.cookies.authToken;

    if (!token)
        return res.status(401).json({Error: "Unauthorized"});

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).json({Error: "Unauthorized"});
            else {
                req.authData = decoded;
                next();
            }
        });

    }
    catch {
        return res.status(400).json({Error: "Authentication error"});
    }

};