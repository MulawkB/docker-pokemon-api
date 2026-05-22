const Pokemon = require('../../models/pokemon-model.js');

const seedPokemons = async () => {
  try {
    const count = await Pokemon.countDocuments();

    if (count > 0) {
      console.log("Pokémons déjà présents, seed ignoré");
      return;
    }

    await Pokemon.insertMany([
      {
        name: "Pikachu",
        hp: 30,
        cp: 16,
        picture: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png",
        types: ["électrique"]
      },
      {
        name: "Salamèche",
        hp: 26,
        cp: 15,
        picture: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png",
        types: ["feu"]
      },
      {
        name: "Bulbizarre",
        hp: 29,
        cp: 13,
        picture: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png",
        types: ["plante", "poison"]
      }
    ]);

    console.log("Pokémons créés avec succès");
  } catch (error) {
    console.error("Erreur seed pokemons:", error.message);
  }
};

module.exports = { seedPokemons };