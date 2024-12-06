import { yarg } from './config/plugins/args.plugin'
import { ServerApp } from './presentation/server-app'
;(async () => {
  await main()
})()

async function main() {
  const { base, limit, show, name, destination } = yarg
  ServerApp.run({
    base,
    limit,
    showTable: show,
    fileName: name,
    fileDestination: destination,
  })
}
