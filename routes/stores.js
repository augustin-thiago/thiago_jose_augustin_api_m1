// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Stores = require('../models/stores');
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');
// importando a biblioteca 'jsonwebtoken'
const jwt = require('jsonwebtoken');
// importando o middleware de autenticação
const auth = require('../middlewares/auth');
// importando a biblioteca para configurações
const config = require('../config/config');

/**
 * FUNÇÕES AUXILIARES
 * 
 */

// criando o endpoint para listar todos os stores
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber os stores
        const stores = await Stores.find({});
        return res.send(stores);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos stores!' });
    }
});

// criando o endpoint para salvar store
router.post('/create', async (req,res) => {
    const { name, site, type, city, state } = req.body;
    console.log(`${name} - ${site} - ${type} - ${city} - ${state} `);
    // testando se todos os campos obrigatórios foram informados
    if (!name || !site) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o store
        const store = await Stores.create(req.body);
        return res.status(201).send({ store });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o store: ${err}`})
    }
});

// criando o endpoint para alterar store
router.put('/update/:id', async (req,res) => {
    const { name, site, type, city, state } = req.body;
    if (!name || !site) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o store
        const store = await Stores.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o store com as alterações
        const storeChanged = await Stores.findById(req.params.id);
        return res.status(201).send({ storeChanged });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o store: ${err}`})
    }     
});

// exportando o módulo
module.exports = router;