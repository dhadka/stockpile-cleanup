import * as core from '@actions/core'
import * as url from 'url'
import { AzureStorageConfiguration, AzureStorageClient } from 'gh-stockpile'

async function cleanup() {
    let accountName: string | undefined = undefined
    let containerName: string | undefined = undefined
    let path = core.getInput("path")
    let sasToken = process.env["SAS_TOKEN"]

    const pathUrl = url.parse(path)
    accountName = pathUrl.host?.substring(0, pathUrl.host.indexOf('.'))
    containerName = pathUrl.path?.substring(1, pathUrl.path.indexOf('/', 1))

    core.info(`Account: ${accountName}, Container: ${containerName}`)

    if (!accountName) {
        core.error("Missing account name")
        return
    }

    if (!containerName) {
        core.error("Missing container name")
        return
    }

    if (!sasToken) {
        core.error("Missing SAS token")
        return
    }

    let configuration = new AzureStorageConfiguration(accountName, containerName, sasToken)
    let client = new AzureStorageClient(configuration)

    await client.cleanup({ verbose: true })
}

cleanup().catch((e) => core.error(e))