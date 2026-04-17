const Pokemon = require('../models/pokemon-model');
console.log(Pokemon);

const findAllPokemons = async (req, res) => {
    const pokemons = await Pokemon.find();
    console.log(`les pokemons ${pokemons}`);
    res.json({ message: pokemons });
}

const findPokemonByPk = async (req, res) => {
    const pokemon = await Pokemon.findById({ _id: req.params.id})
    res.json({ message: pokemon });
}

const createPokemon = async (req, res) => {
    const pokemon = await Pokemon.create(req.body);
    res.json({ "new pokemon": pokemon });
}

const updatePokemon = async (req, res) => {
    const id = req.params.id
    console.log(`update pokemon id = ${id}`);
    console.log(`update pokemon body = ${JSON.stringify(req.body)}`);
    const pokemon = await Pokemon.findOneAndUpdate({ _id: id}, req.body, { new: true });
    res.json({ "pokemon maj : ": pokemon });
}
const deletePokemon = async (req, res) => {
    const id = req.params.id
    const pokemon = await Pokemon.findById({_id: id});
    await Pokemon.deleteOne({ _id: id });
    res.json({ "pokemon supprimé : ": pokemon });
}
module.exports = { findAllPokemons, findPokemonByPk, createPokemon, updatePokemon, deletePokemon };