const { httpClient } = require("../plugins/http-client.plugin.js")

const getPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemon = await httpClient.get(url);

  return pokemon.name
  // return fetch(url)
  // .then((response) => response.json())
  // .then((pokemon) => pokemon.name);
}

module.exports = {
  getPokemonById,
}