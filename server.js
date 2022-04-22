const sessionController = require('./src/controllers/SessionController')
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const port = 3000;

const session = new sessionController(server)
session.connect()

app.use('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

