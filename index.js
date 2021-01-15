import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { computeTriangulation } from './app/index.js';

const __dirname = path.resolve();
const server = express();
const host = '127.0.0.1';
const port = 80;

server.use(express.static(__dirname + '/client'));
server.use(bodyParser.json());

server.post('/api', (req, res) => {
  const {height, radius, segments} = req.body;
  console.log(computeTriangulation(height, radius, segments));
  res.sendStatus(200);
});

server.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});
