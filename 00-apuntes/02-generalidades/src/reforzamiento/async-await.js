async function obtenerDatos() {
  const datos = await new Promise((resolve) =>
    setTimeout(() => resolve('Datos'), 1000)
  )
  console.log(datos)
}

obtenerDatos()


