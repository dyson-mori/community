const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3333;

const { tags, posts } = require('./pegi-eighteen.json');

const server = http.createServer((req, reply) => {
  if (req.url === '/api/tags') {
    reply.setHeader("Content-Type", "application/json");
    reply.writeHead(201);
    reply.end(`${JSON.stringify(tags)}`);
  };
  
  if (req.url === '/api/posts') {
    reply.setHeader("Content-Type", "application/json");
    reply.writeHead(201);
    reply.end(`${JSON.stringify(posts)}`);
  };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});