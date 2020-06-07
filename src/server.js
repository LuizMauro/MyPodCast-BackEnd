const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors');
require('./database');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/filepdf', express.static(path.resolve(__dirname, '../', 'tmp', 'pdfs')))
server.use('/files', express.static(path.resolve(__dirname,'../', 'tmp', 'uploads', 'imgpodcast')))
server.use(routes);

server.listen(3333);
