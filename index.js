const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const pokemonRoutes = require('./routes/pokemon-routes.js');
const userRoutes = require('./routes/user-routes.js');
const { authMdlr } = require('./src/middlewares/auth');
const createFirstUser = require('./src/db/create-first-user.js');
const { seedPokemons } = require('./src/db/pokemon-seeder.js');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/*mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon-api-rest-Brian-Mulawka')
    .then(async() => {
        console.log('connexion à MongoDB réussie !')})
    .catch(err => console.error(err));
*/
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon-api-rest-Brian-Mulawka');

    console.log("connexion à MongoDB réussie !");

    await seedPokemons();
    await createFirstUser.createFirstUser();

    app.post('/api/login', userRoutes.userLogin);

    app.use(authMdlr);

    app.get('/api/pokemons', pokemonRoutes.findAllPokemons);
    app.get('/api/pokemons/:id', pokemonRoutes.findPokemonByPk);
    app.post('/api/pokemons', pokemonRoutes.createPokemon);
    app.put('/api/pokemons/:id', pokemonRoutes.updatePokemon);
    app.delete('/api/pokemons/:id', pokemonRoutes.deletePokemon);

    app.use((req, res) => res.json({ message: 'not found' }));

    app.listen(8000, () => {
      console.log("l'application écoute sur le port 8000");
    });

  } catch (err) {
    console.error(err);
  }
}

start();
/*
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

createFirstUser.createFirstUser();
seedPokemons();

app.post('/api/login', userRoutes.userLogin);

app.use(authMdlr);

app.get('/api/pokemons', pokemonRoutes.findAllPokemons);
app.get('/api/pokemons/:id', pokemonRoutes.findPokemonByPk);
app.post('/api/pokemons', pokemonRoutes.createPokemon);
app.put('/api/pokemons/:id', pokemonRoutes.updatePokemon);
app.delete('/api/pokemons/:id', pokemonRoutes.deletePokemon);

app.use((req, res) => res.json({ message: 'not found' }));
app.listen(8000, () => { console.log(`l'application écoute bien sur le port 8000`) }); */