const nombre = process.argv[2]
const apellido = process.argv[3]

console.log(process.argv)

console.log(`Hola, ${nombre} ${apellido ?? ''}!`)
