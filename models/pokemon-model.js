const { Schema, model } = require('mongoose');

const Pokemon = new Schema({
    name: String,
    hp: Number,
    cp: Number,
    picture: String,
    types: [String],
    created: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Pokemon', Pokemon);