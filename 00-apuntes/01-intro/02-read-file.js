const fs = require('node:fs')

//Lectura asíncrona
fs.readFile('archivo.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(`Error al leer el archivo: ${err}`)
    return
  }
  console.log(`Contenido del archivo: ${data}`)
})

//Lectura sincróna
try {
  const data = fs.readFileSync('archivo.txt', 'utf-8')
  console.log(`Contenido del archivo: ${data}`)
} catch (error) {
  console.error(`Error al leer el archivo: ${error}`)
}
