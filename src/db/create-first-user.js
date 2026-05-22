const bcrypt = require('bcrypt');
const User = require('../../models/user-model.js');
const createFirstUser = async () => {

    const hash = await bcrypt.hash('pikachu', 10);
    try {
        const user = await User.create({
            username: 'pikachu',
            password: hash
        });
        console.log(`la création du premier utilisateur a réussi ${user}`);
    } catch (error) {
        console.log(`erreur lors de la création du premier utilisateur ${error}`);
    }
}

module.exports = { createFirstUser }
