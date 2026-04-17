const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = require('../src/auth/private_key.js');

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username});
        if (!user) {
            const message = `L'utilisateur demandé n'existe pas.`;
            return res.status(404).json({ message });
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ msg : message, data: user.body.username });
        }
        const token = await jwt.sign({ idUser: user._id, uName: user.username }, private_key, { expiresIn: '2h' });

        const message = `L'utilisateur est connecté.`;
        return res.json({msg: message, data: user.username, token });
    } catch (error) {
        const message = `Erreur lors de la connexion de l'utilisateur.`;
        return res.status(500).json({ message, data: error });
    }
}
module.exports = { userLogin };