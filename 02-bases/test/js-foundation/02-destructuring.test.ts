import { characters } from '../../src/js-foundation/02-destructuring'

describe('js-foundation/02-destructuring', () => {
  test('characters should contain luke, chewbacca', () => {
    expect(characters).toContain('luke')
    expect(characters).toContain('chewbacca')
  })

  test('first character should be luke', () => {
    expect(characters[0]).toBe('luke')
  })
})
