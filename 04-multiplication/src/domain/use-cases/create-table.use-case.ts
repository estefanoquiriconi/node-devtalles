export interface createTableUseCase {
  execute: (options: CreateTableOptions) => string
}

interface CreateTableOptions {
  base: number
  limit?: number
}

export class CreateTable implements createTableUseCase {
  constructor /** DI - Dependency Injection */() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let content = ''
    for (let i = 1; i <= limit; i++) {
      content += `${base} x ${i} = ${base * i}`
      if (i < limit) content += '\n'
    }

    return content
  }
}
