// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Products = require('../models/products');
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

// criando o endpoint para listar todos os produtos
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber os produtos
        const products = await Products.find({});
        return res.send(products);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos produtos!' });
    }
});

// criando o endpoint para salvar usuário
router.post('/create', async (req,res) => {
    const { name, type, brand, price, picture} = req.body;
    console.log(`${name} - ${type} - ${brand} - ${price} - ${picture}`);
    // testando se todos os campos obrigatórios foram informados
    if (!name || !brand || !price || price <= 0) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o produto
        const products = await Products.create(req.body);
        return res.status(201).send({ products });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o produto: ${err}`})
    }
});

// criando o endpoint para alterar produto
router.put('/update/:id', async (req,res) => {
    const { name, type, brand, price, picture} = req.body;
    console.log(`${name} - ${type} - ${brand} - ${price} - ${picture}`);
    if (!name || !brand || !price && price > 0) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // preparando o objeto com o produto
        const product = await Products.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const productChanged = await Products.findById(req.params.id);
        return res.status(201).send({ productChanged });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o produto: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id', async (req,res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Produto removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover produto!' });
    }     
});

// exportando o módulo
module.exports = router;