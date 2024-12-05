import { getAge } from '../../src/plugins/get-age.plugin'

describe('plugins/get-age.plugin', () => {
  test('getAge should return the age of the person', () => {
    const birthdate = '1997-01-01'
    const age = getAge(birthdate)
    expect(typeof age).toBe('number')
  })
})
