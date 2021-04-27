// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;

// criação do 'schema' para o usuário
const productSchema = new Schema({
    name: { type: String, required: true, unique: false },
    type: { type: String, required: false, unique: false },
    brand: { type: String, required: true, unique: false},
    price: { type: Number, required: true, unique: false},
    picture: { type: String, required: false},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);