// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const userSchema = new Schema({
    name: { type: String, required: true, unique: false },
    lastname: { type: String, required: true, unique: false },
    birthdate: { type: String, required: true, unique: false},
    username: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, select: false },
    clue: { type: String, required: false, unique: false},
    city: { type: String, required: false, unique: false},
    state: { type: String, required: false, unique: false},
    created: { type: Date, default: Date.now }
});

// criando uma nova função para preparar os campos
userSchema.pre('save', async function (next) {
    let user = this;
    // testando se o campo de senha foi modificado
    if (!user.isModified('password'))
        return next();
    // criando o hash para o campo password
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', userSchema);