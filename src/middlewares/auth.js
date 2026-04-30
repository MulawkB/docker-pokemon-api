const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');

const authMdlr = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization header =", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Vous n'avez pas fourni de token d'authentification."
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Format du token invalide."
        });
    }

    const token = parts[1];

    jwt.verify(token, private_key, (error, decodedToken) => {
        console.log("error =", error);
        console.log("decodedToken =", decodedToken);
        if (error) {
            return res.status(401).json({
                message: "L'utilisateur n'est pas autorisé à accéder à cette ressource.",
                data: error
            });
        }
        if (!decodedToken || !decodedToken.idUser) {
            return res.status(401).json({
                message: "Token invalide : userId manquant"
            });
        }
        req.auth = { userId: decodedToken.idUser };
        next();
    });
};

module.exports = { authMdlr };