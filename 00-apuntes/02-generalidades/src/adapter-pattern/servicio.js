const http = require('./adaptadorHttp')

const obtenerDatos = async () => {
  const respuesta = await http.get('https://jsonplaceholder.typicode.com/posts')

  return respuesta.data
}

;(async () => {
  console.log(await obtenerDatos())
})()
