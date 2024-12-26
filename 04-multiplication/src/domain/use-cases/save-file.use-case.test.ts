import { SaveFile } from './save-file.use-case'
import fs from 'fs'

describe('SaveFileUseCase', () => {
  afterEach(() => {
    fs.rmSync('outputs', { recursive: true })
  })

  test('should save file with default values', () => {
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content',
    }

    const result = saveFile.execute(options)
    const fileExist = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

    expect(result).toBeTruthy
    expect(fileExist).toBeTruthy
    expect(fileContent).toContain(options.fileContent)
  })
})
