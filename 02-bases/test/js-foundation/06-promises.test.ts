import { getPokemonNameById } from '../../src/js-foundation/06-promises'

describe('js-foundation/06-promises', () => {
  test('getPokemonNameById should return the name of the pokemon', async () => {
    const pokemonId = 1
    const pokemonName = await getPokemonNameById(pokemonId)
    expect(pokemonName).toBe('bulbasaur')
  })

  test('getPokemonNameById should return an error if the pokemon does not exist', async () => {
    const pokemonId = 9999999
    try {
      await getPokemonNameById(pokemonId)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBe(`Pokemon with id ${pokemonId} not found`)
    }
  })
})
