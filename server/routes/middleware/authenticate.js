const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.cookies.authToken;

    if (!token)
        return res.status(401).json({Error: "Unauthorized"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({Error: "Unauthorized"});
        else {
            req.authData = decoded;
            next();
        }
    });

};