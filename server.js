const cors = require('cors')
const express = require('express');

const SessionController = require('./src/controllers/SessionController')

const app = express();
app.use(cors({credentials: true, origin: '*'}));

const server = require('http').createServer(app);

const session = SessionController
session.connect(server)

app.all('/', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/test', (req, res) => {
    res.send(`aaaa`)
    console.log('testing')
})

server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
})

