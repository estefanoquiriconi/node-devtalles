const fs = require('node:fs')

const contenido = `Node.js incluye el módulo fs para interactuar con el sistema de archivos. 
Este módulo soporta operaciones tanto sincrónicas como asíncronas.`

//Escritura asíncrona
fs.writeFile('nuevoArchivo.txt', contenido, (err) => {
  if (err) {
    console.error(`Error al escribir el archivo: ${err}`)
    return
  }
  console.log('Archivo escrito exitosamente')
})

//Escritura sincrónica
try {
  fs.writeFileSync('nuevoArchivo.txt', contenido)
  console.log('Archivo escrito exitosamente')
} catch (error) {
  console.log(`Error al escribir el archivo: ${error}`)
}
