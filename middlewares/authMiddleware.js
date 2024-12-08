const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.redirect('/auth/login'); // Redirige al login si no hay token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.redirect('/auth/login'); // Redirige al login si el token es inválido
    }
};

module.exports = verifyToken;
