const express = require('express');

const app = express();

const porta = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

require('./app/controller/ContatoController')(app);

app.listen(porta, () => console.log('Servidor está rodando na porta: ' + porta));