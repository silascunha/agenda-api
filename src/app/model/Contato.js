const mongoose = require('../../database');

const ContatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: [true, 'O contato deve ter um campo (nome)'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'O contato deve ter um campo (email)'],
        lowercase: true,
    },
    telefone: {
        type: String,
        unique: true,
        required: [true, 'O contato deve ter um campo (telefone)'],
    },
});

const Contato = mongoose.model('Contato', ContatoSchema);

module.exports = Contato;