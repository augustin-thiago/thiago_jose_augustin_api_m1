// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Shops = require('../models/shops');
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

// criando o endpoint para listar todos os shops
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber os shops
        const shops = await Shops.find({});
        return res.send(shops);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos shops!' });
    }
});

// criando o endpoint para salvar shop
router.post('/create', async (req,res) => {
    const { name, site, type, city, state } = req.body;
    console.log(`${name} - ${site} - ${type} - ${city} - ${state} `);
    // testando se todos os campos obrigatórios foram informados
    if (!name || !site) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o shop
        const shop = await Shops.create(req.body);
        return res.status(201).send({ shop });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o shop: ${err}`})
    }
});

// criando o endpoint para alterar shop
router.put('/update/:id', auth, async (req,res) => {
    const { name, site, type, city, state } = req.body;
    if (!name || !site) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o shop
        const shop = await Shops.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o shop com as alterações
        const shopChanged = await Shops.findById(req.params.id);
        return res.status(201).send({ shopChanged });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o shop: ${err}`})
    }     
});

// exportando o módulo
module.exports = router;