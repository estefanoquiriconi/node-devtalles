const promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promesa resuelta'), 1000)
})

promesa.then((mensaje) => {
  console.log(mensaje)
})


