import * as core from '@actions/core'
import { Stockpile } from 'gh-stockpile'

async function cleanup() {
    let path = core.getInput("path")
    let client = Stockpile.createClient(path)

    await client.cleanup({ verbose: true })
}

cleanup().catch((e) => {
    core.error(e)
    process.exit(-1)
})