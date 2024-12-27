// Importar el módulo HTTP
const http = require('node:http')

// Crear un servidor
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hola Mundo')
})

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/')
})
