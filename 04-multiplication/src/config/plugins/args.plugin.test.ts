// import { yarg } from './args.plugin'

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('./args.plugin')

  return yarg
}

describe('Test args.plugin.ts', () => {
  const originalArgv = process.argv

  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual(
      expect.objectContaining({
        base: 5,
        limit: 10,
        show: false,
        name: 'table',
        destination: 'outputs',
      })
    )
  })
  test('should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '7',
      '-l',
      '5',
      '-s',
      'true',
      '-d',
      'custom-outputs',
      '-n',
      'custom-name',
    ])

    expect(argv).toEqual(
      expect.objectContaining({
        base: 7,
        limit: 5,
        show: true,
        name: 'custom-name',
        destination: 'custom-outputs',
      })
    )
  })
})
