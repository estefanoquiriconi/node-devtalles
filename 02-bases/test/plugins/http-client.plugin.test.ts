import { httpClient } from '../../src/plugins/http-client.plugin'

describe('plugins/http-client.plugin', () => {
  test('httpClient.get should should return a string', async () => {
    const data = await httpClient.get(
      'https://jsonplaceholder.typicode.com/todos/1'
    )
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: expect.any(String),
      completed: expect.any(Boolean),
    })
  })

  test('httpClient should have POST, PUT and DELETE methods not implemented', () => {
    expect(httpClient.post).rejects.toThrow('Not implemented')
    expect(httpClient.put).rejects.toThrow('Not implemented')
    expect(httpClient.delete).rejects.toThrow('Not implemented')
  })
})
