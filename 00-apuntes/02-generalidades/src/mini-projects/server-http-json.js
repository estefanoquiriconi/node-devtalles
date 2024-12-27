const http = require('node:http')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ mensaje: 'Hola mundo' }))
  })
  .listen(3000, () => console.log('Servidor escuchando en el puerto 3000'))
