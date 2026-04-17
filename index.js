const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const pokemonRoutes = require('./routes/pokemon-routes');
const userRoutes = require('./routes/user-routes');
const { authMdlr } = require('./src/middlewares/auth');
createFirstUser = require('./src/db/create-first-user');

const app = express();

mongoose.connect('mongodb://localhost:27017/pokemon-api-rest-Brian-Mulawka')
    .then(() => console.log('connexion à MongoDB réussie !'))
    .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

createFirstUser.createFirstUser();

app.post('/api/login', userRoutes.userLogin);

app.use(authMdlr);

app.get('/api/pokemons', pokemonRoutes.findAllPokemons);
app.get('/api/pokemons/:id', pokemonRoutes.findPokemonByPk);
app.post('/api/pokemons', pokemonRoutes.createPokemon);
app.put('/api/pokemons/:id', pokemonRoutes.updatePokemon);
app.delete('/api/pokemons/:id', pokemonRoutes.deletePokemon);

app.use((req, res) => res.json({ message: 'not found' }));
app.listen(8000, () => { console.log('app listening on port 8000') });