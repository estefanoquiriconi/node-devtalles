import fs from 'fs'
import { yarg } from './config/plugins/args.plugin'

const { base, limit, show: showTable } = yarg

const outputDir = 'outputs'
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

const number = base
const separator = '='.repeat(25)
let content = `${separator}\nTabla del ${number}\n${separator}\n`

for (let i = 1; i <= limit; i++) {
  content += `${number} x ${i} = ${number * i}\n`
}

fs.writeFileSync(`${outputDir}/tabla-${number}.txt`, content)
console.log('File created successfully')

if (showTable) console.log(content)
