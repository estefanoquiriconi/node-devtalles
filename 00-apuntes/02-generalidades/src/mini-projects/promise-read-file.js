const fs = require('fs/promises')

async function readFile() {
  const data = await fs.readFile('data.json', 'utf-8')

  console.log(JSON.parse(data))
}

readFile()
