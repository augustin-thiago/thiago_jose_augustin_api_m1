// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;

// criação do 'schema' para o usuário
const shopSchema = new Schema({
    name: { type: String, required: true, unique: false },
    site: { type: String, required: true, unique: true },
    type: { type: String, required: false, unique: false},
    city: { type: String, required: false, unique: false},
    state: { type: String, required: false, unique: false},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);