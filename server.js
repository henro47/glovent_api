const http = require('http');
const app = require('./app');
require('dotenv').config('.env');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Node.js Express server is listening on ${port}`);
});