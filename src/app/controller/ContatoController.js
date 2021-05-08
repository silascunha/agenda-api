const express = require("express");

const Contato = require('../model/Contato');

const router = express.Router();

// listagem de todos os contatos, ou dos que tiverem de acordo com o filtro caso houver
router.get('/', async (req, res) => {
    try {
        let contatos;
        const filtro = req.query.filtro;

        if(filtro) {
            let regex = new RegExp(filtro, 'i');
            contatos = await Contato.find().or([{nome: regex}, {email: regex}, {telefone: regex}]);
        }
        else {
            contatos = await Contato.find();
        }
    
        return res.send(contatos);
    } 
    catch (e) {
        console.log(e);
        return res.status(400).send({error: 'Não foi possível listar os contatos'});
    }
});

// buscar um contato pelo id
router.get('/:contatoId', async (req, res) => {

    try {
        const contato = await Contato.findById(req.params.contatoId);

        if (!contato) {
            return res.status(404).send({error: 'Contato não encontrado com o id = ' + req.params.contatoId});
        }

        res.send(contato);
    }
    catch (e) {
        return res.status(400).send({error: 'Ocorreu algum erro ao encontrar o contato'});
    }

});

// Inserir um contato
router.post('/', async (req, res) => {
    
    try {
        const contato = await Contato.create(req.body);

        return res.status(201).send(contato);
    }
    catch (e) {
        const estruturaErro = {
            status: 400,
            error: 'Falha ao registrar o contato',
            message: e.message
        }
        return res.status(400).send(estruturaErro);
    }
});

// Atualizar os dados de um contato pelo id
router.put('/:contatoId', async (req, res) => {
    
    try {
        const contato = await Contato.findByIdAndUpdate(
            req.params.contatoId, 
            req.body, 
            {new: true, useFindAndModify: false}
            );

        return res.send(contato);
    }
    catch (e) {
        const estruturaErro = {
            status: 400,
            error: 'Falha ao atualizar o contato',
            message: e.message
        }
        return res.status(400).send(estruturaErro);
    }
});

// excluir um contato pelo id
router.delete('/:contatoId', async (req, res) => {
    try {
        await Contato.findByIdAndDelete(req.params.contatoId);
    
        return res.status(204).send();
    }
    catch (e) {
        return res.status(400).send({error: 'Falha ao excluir contato'})
    }
});

module.exports = app => app.use('/contatos', router);