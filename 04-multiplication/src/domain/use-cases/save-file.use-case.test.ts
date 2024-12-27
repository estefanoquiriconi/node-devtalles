import { SaveFile } from './save-file.use-case'
import fs, { existsSync, mkdirSync, readFileSync, rmSync } from 'fs'

describe('SaveFileUseCase', () => {
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name',
  }
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    if (existsSync('outputs')) rmSync('outputs', { recursive: true })

    if (existsSync(customOptions.fileDestination))
      rmSync(customOptions.fileDestination, { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExist = existsSync(filePath)
    const fileContent = readFileSync(filePath, { encoding: 'utf-8' })

    expect(result).toBeTruthy
    expect(fileExist).toBeTruthy
    expect(fileContent).toContain(options.fileContent)
  })

  test('should save file with custom values ', () => {
    const saveFile = new SaveFile()

    const result = saveFile.execute(customOptions)
    const fileExist = existsSync(customFilePath)
    const fileContent = readFileSync(customFilePath, {
      encoding: 'utf-8',
    })

    expect(result).toBeTruthy
    expect(fileExist).toBeTruthy
    expect(fileContent).toContain(customOptions.fileContent)
  })

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile()
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing')
    })

    const result = saveFile.execute(customOptions)

    expect(result).toBe(false)

    mkdirSpy.mockRestore()
  })

  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile()

    const writeFileSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message')
      })

    const result = saveFile.execute({
      fileContent: 'Hola',
    })

    expect(result).toBe(false)

    writeFileSpy.mockRestore()
  })
})
