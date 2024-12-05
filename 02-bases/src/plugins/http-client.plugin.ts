import axios from 'axios'

export const httpClient = {
  get: async (url: string) => {
    const { data } = await axios.get(url)
    return data
  },
  put: async (url: string, body: any) => {
    throw new Error('Not implemented')
  },
  post: async (url: string, body: any) => {
    throw new Error('Not implemented')
  },
  delete: async (url: string) => {
    throw new Error('Not implemented')
  },
}
