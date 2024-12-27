function leerArchivo(callback) {
  setTimeout(() => {
    callback('Archivo leído')
  }, 1000)
}

leerArchivo((mensaje) => {
  console.log(mensaje)
})
