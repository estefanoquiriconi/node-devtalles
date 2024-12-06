import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
  .option('base', {
    alias: 'b',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base',
  })
  .option('limit', {
    alias: 'l',
    type: 'number',
    default: 10,
    describe: 'Multiplication table limit',
  })
  .option('show', {
    alias: 's',
    type: 'boolean',
    default: false,
    describe: 'Show the multiplication table',
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    default: 'table',
    describe: 'File name',
  })
  .option('destination', {
    alias: 'd',
    type: 'string',
    default: 'outputs',
    describe: 'File destination',
  })
  .check((argv, options) => {
    if (argv.base <= 0) throw 'Error: base must be a positive number'
    return true
  })
  .parseSync()
