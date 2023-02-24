---
title: Commands
autonav:
    order: 1
---

# Commands

This is a full list of all ct commands.

# Basic Commands

Basic commands that don't belong under any particular category.

## `config`

::: example

Generate a config file with default options.

```sh
ct config
```

Generate a config file with the --address flag configured

```sh
ct config --address 0xFf255f8A7Cf00D68a123a2553a7d0cdCA63f61c3
```
:::

Generate a chain-tool.yaml file with the default and flagged configuration options.

If you specify flags to this command, those will be written to the config file along with any defaults.

Then when other ct commands are run, ct looks for a `chain-tool.yaml` or `.ctrc.yaml` file in the current directory, and uses it for configuration if found.

This way, you can have multiple directories with different configurations for working on different tasks or projects.


**Common flags**: [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output), [`--ethplorer-key`](./flags.md#ethplorer-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--etherscan-key`](./flags.md#etherscan-key), [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--dump`](./flags.md#dump), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--file` (-f)](./flags.md#file), [`--private-key` (-k)](./flags.md#private-key), [`--gasprice` (-g)](./flags.md#gasprice), [`--force-gasprice`](./flags.md#force-gasprice), [`--gas-priority` (-p)](./flags.md#gas-priority), [`--gaslimit`](./flags.md#gaslimit)

## `from-wei`

::: example

Convert from wei using the default 18 decimals.

```sh
ct from-wei 10000000000000000000
```

Convert with a custom decimal count of 6.

```sh
ct from-wei -d 6 10000000
```
:::

Convert Wei to Ether, or other decimal counts with -d.

**Common flags**: [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

**Special flags**:

- `--decimals` (`-d`) Decimals for conversion.

## `wei`

::: example

Convert ETH to wei using the default 18 decimals.

```sh
ct wei 1
```

Convert with a custom decimal count of 6.

```sh
ct wei -d 6 1
```
:::

Convert Ether to Wei, or other decimal counts with -d.

**Common flags**: [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

**Special flags**:

- `--decimals` (`-d`) Decimals for conversion.

## `autocomplete`

::: example

```sh
ct autocomplete
```

```sh
ct autocomplete bash
```

```sh
ct autocomplete zsh
```

```sh
ct autocomplete --refresh-cache
```
:::

display autocomplete installation instructions

**Special flags**:

- `--refresh-cache` (`-r`) Refresh cache (ignores displaying instructions)

## `version`



# analyze

Analyze blockchain data.

Analysis is based on Google BigQuery data, and so requires a GCP authentication key, provided as a JSON key file. See [the GCP docs for more info](https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account).

## `analyze:crawl`

::: example

Crawl a list of given addresses.

```sh
ct analyze:crawl 0xaaf70e052b76c9bd177e24a0e249f17cc3486ea0 0x409BB451A0beEe76E8718c3b9FcE7426eb0fC4Db
```

Crawl addresses from a CSV file with depth 1.

```sh
ct analyze:crawl wallets.csv --depth 1
```
:::

Crawls transfers between a network of addresses.

analyze:crawl finds all transfers of ETH and tokens from and to the list of addresses given, and then does the same for all addresses involved in the transfers from the first list, thereby crawling a network of associated wallets.

The crawl will then repeat the process with the bigger list as many times as specified with the --depth option. This defaults to 2. Increasing the depth will very quickly create an enormous list of addresses, so it's best to keep this value at 2 or 3.

**Common flags**: [`--dump`](./flags.md#dump), [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--output` (-o)](./flags.md#output), [`--no-prices`](./flags.md#no-prices), [`--key` (-k)](./flags.md#key), [`--since`](./flags.md#since), [`--until`](./flags.md#until)

**Special flags**:

- `--depth` (`-d`) Crawl depth for finding transfers for each address.

## `analyze:flows`

::: example

Find flows between two wallets.

```sh
ct analyze:crawl 0xaaf70e052b76c9bd177e24a0e249f17cc3486ea0 0x409BB451A0beEe76E8718c3b9FcE7426eb0fC4Db
```
:::

Show all total flows of assets between wallets, with USD values.

analyze:flows first crawls addresses the same way as the analyze:crawl command, but then further processes the data to find the flows.

**Common flags**: [`--dump`](./flags.md#dump), [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--output` (-o)](./flags.md#output), [`--no-prices`](./flags.md#no-prices), [`--key` (-k)](./flags.md#key), [`--since`](./flags.md#since), [`--until`](./flags.md#until)

**Special flags**:

- `--depth` (`-d`) Crawl depth for finding transfers for each address.

## `analyze:relation`

::: example

```sh
ct analyze:relation transfers-crawled.csv 0x409BB451A0beEe76E8718c3b9FcE7426eb0fC4Db
```
:::

Analyze how connected a wallet is to other wallets in the data.

analyze:relation expects a CSV output from the analyze:crawl command as its first argument, which it uses as the data to analyze. The second argument is a wallet address in the data that should be analyzed.

**Special flags**:

- `--output` (`-o`) Prefix for files to write to, &lt;prefix&gt;-in.csv and &lt;prefix&gt;-out.csv.

# blockscout

Load and use data from the Blockscout API.

## `blockscout:transfers`

::: example

Get transfers for a wallet.

```sh
ct blockscout:transfers 0x84d26fa08f0954ed2675475fe0335c6693739754
```

Use a custom Blockscout URL for a different chain.

```sh
ct blockscout:transfers 0x84d26fa08f0954ed2675475fe0335c6693739754 --url https://eth-goerli.blockscout.com/ --network 5
```
:::

Load ETH and token transfers for a given wallet.

blockscout:transfers uses the Blockscout API to load its data, so a Blockscout instance must be available to be read from. For some chains that can be determined automatically, but you may need to provide a link to the desired Blockscout with --url &lt;link&gt;.

**Common flags**: [`--dump`](./flags.md#dump), [`--network` (-n)](./flags.md#network), [`--no-prices`](./flags.md#no-prices)

**Special flags**:

- `--url` Base URL to the Blockscout instance to use.
- `--output` (`-o`) File to write data to. Defaults to a file based on the wallet address.

# book

Tools for managing Books.

## `book:copy`

::: example

Copy a Book from Rinkeby to Goerli.

```sh
ct book:copy rinkeby.0xd5c651ca53a25ac1a94d16f377249bbd141d190a goerli.0x6375056Bc200d34457c3E428b05E1d11587AD6B8 -f goerli-wallet
```
:::

Copy files from a source Book to a destination Book.

When reading Books with "auto" encryption, the command will ask you to log in to your Blockwell Wallet to decrypt the content before saving it to the new book. You will also have a chance to change the tokens being used for auto encryption.

Your wallet must have the necessary permissions in the destination Book to write the files to it.

**Common flags**: [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--file` (-f)](./flags.md#file), [`--private-key` (-k)](./flags.md#private-key)

**Special flags**:

- `--select` (`-s`) Select which folders to copy.

## `book:save`

::: example

Save a Book to a new folder based on the address of the Book.

```sh
ct book:save 4.0x9c4287525999893bf730134f74e69e4a6f8973b6
```

Save a Book to a specific folder.

```sh
ct book:save 4.0x9c4287525999893bf730134f74e69e4a6f8973b6 -o books/playground
```
:::

Save a Book into regular files.

book:save will download all the folders and files from the specified Book, and save it as regular files. It will also save any encoding data into a special '_encoding' file in each folder.

If any files in the Book use the "auto" encryption mode, the command will ask you to log in to your Blockwell Wallet for decrypting it.

**Common flags**: [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token)

**Special flags**:

- `--output` (`-o`) Output folder, defaults to the chain ID and address of the contract.

# bq

Use Google BigQuery data.

All bq commands required a Google Cloud Platform key, provided as a JSON key file. See [the GCP docs for more info](https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account).

## `bq:token`

::: example

Get a list of transfers for a token with a given address.

```sh
bq:token 0x618E75Ac90b12c6049Ba3b27f5d5F8651b0037F6
```
:::

Load all transfers of a specific token.

bq:token uses BigQuery to load all transfers of a token, regardless of how long that list is. For tokens with more than 100,000 transfers it can be difficult to get a complete list any other way.

Note that BigQuery data is only available for Ethereum Mainnet.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--dump`](./flags.md#dump), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output), [`--no-prices`](./flags.md#no-prices), [`--key` (-k)](./flags.md#key), [`--since`](./flags.md#since), [`--until`](./flags.md#until)

## `bq:transfers`

::: example

Get a list of transfers for a wallet.

```sh
ct bq:transfers 0x84d26fa08f0954ed2675475fe0335c6693739754
```

Limit the list of transfers to a specific time frame.

```sh
ct bq:transfers 0x84d26fa08f0954ed2675475fe0335c6693739754 --since 2021-01-01 --until 2021-12-31
```
:::

Load ETH and token transfers for a given wallet.

bq:transfers uses BigQuery data to get a complete list of all transfers for a given wallet.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--dump`](./flags.md#dump), [`--no-prices`](./flags.md#no-prices), [`--key` (-k)](./flags.md#key), [`--since`](./flags.md#since), [`--until`](./flags.md#until)

**Special flags**:

- `--output` (`-o`) File to write data to. Defaults to a file based on the wallet address.

# contract

Tools for smart contracts.

## `contract:decode-error`

::: example

Decode a raw error code.

```sh
ct contract:decode-error -n stripchain --address 0x6ca6912b867EA1a43a02b4BfCF61c559F4B94dDf 0xdb7e6527
```
:::

Decode raw error data for a reverted contract transaction.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi)

## `contract:deploy`

::: example

Send Goerli Food Coin tokens using the ERC-20 transfer function.

```sh
ct -n goerli -f goerli-account --address 0xFf255f8A7Cf00D68a123a2553a7d0cdCA63f61c3 contract:write transfer 0x7febB7c2d3Eed50a24e3604A89BC92375aeF1C2e 1e18
```
:::

Deploy a smart contract.

The build file needs to be a JSON build file produced by most Solidity build tools: a JSON file with an `abi` field and a `bytecode` field. The artifacts from Truffle and Hardhat use this format, for example.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output), [`--file` (-f)](./flags.md#file), [`--private-key` (-k)](./flags.md#private-key), [`--gasprice` (-g)](./flags.md#gasprice), [`--force-gasprice`](./flags.md#force-gasprice), [`--gas-priority` (-p)](./flags.md#gas-priority), [`--gaslimit`](./flags.md#gaslimit)

**Special flags**:

- `--nonce` Override the automatic transaction nonce with a specific number. You can also adjust the automatic nonce by prefixing the number with + or -, for example +1, -1, +2, and so on.
- `--dry` Prepare the transaction (ie. dry-run) without sending it, showing gas values and potential errors.
- `--noconfirm` Send the transaction, but don't wait for it to confirm.
- `--nowait` Don't wait 3 seconds before sending the transaction.

## `contract:events`

::: example

Display event types in the default contract.

```sh
ct contract:functions
```

Display event types from an ABI file.

```sh
ct contract:functions erc20.abi
```
:::

List all event types in the contract.

The default configured contract will be used, or the first argument can point to an ABI file to read.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi)

## `contract:functions`

::: example

Display functions in the default contract.

```sh
ct contract:functions
```

Display functions from an ABI file.

```sh
ct contract:functions erc20.abi
```
:::

List all functions in the contract.

The default configured contract will be used, or the first argument can point to an ABI file to read.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi)

## `contract:has-functions`

::: example

Check for functions with signatures

```sh
ct contract:has-functions 0x212D95FcCdF0366343350f486bda1ceAfC0C2d63 'transfer(address,uint256)' 'approve(address,uint256)'
```

Check for functions using the 4 byte hashes

```sh
ct contract:has-functions 0x212D95FcCdF0366343350f486bda1ceAfC0C2d63 0xa9059cbb 0x095ea7b3
```
:::

Checks if the given smart contract implements the specified functions.

This is intended for cases where a contract's ABI is not known, and there's no source code. In most cases the detection is fairly accurate, but it does depend on analysis of the bytecode, so it's not 100% reliable.

The desired functions can be provided using their signatures (eg. 'transfer(address,uint256)') or by the 4 byte hash (eg. 0xa9059cbb).

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key)

## `contract:ids`

::: example

Get IDs for two contracts.

```sh
ct contract:ids 0x3184606d90a56d264EC6f3E50aC0afBD60F43100 0x0F63b9D8EAdA8C9e1b74047C0f684E36731a93f7
```
:::

Get API Miner contract IDs for a list of contracts.

**Common flags**: [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token)

## `contract:logs`

::: example

Get event logs.

```sh
ct -n stripchain --address 0xB00bCABD65119EF3632E0Ff45BB2f8007a210309 contract:logs
```

Get event logs with timestamps.

```sh
ct -n stripchain --address 0xB00bCABD65119EF3632E0Ff45BB2f8007a210309 contract:logs --timestamps
```

Limit event logs to a range of blocks.

```sh
ct -n stripchain --address 0xB00bCABD65119EF3632E0Ff45BB2f8007a210309 contract:logs --from 1259815 --to 1454774
```
:::

Load event logs for a smart contract.

The events are retrieved from the blockchain node directly, which means in most cases the process is very slow. That's because it has to scan the entire blockchain bit by bit looking for the events.

You can improve speed by limiting the search to a specific range of blocks using --from and --to. Some node providers, such as Infura, also have special setups that speed up these searches, so using one of those may help.

The --timestamps option will make sure all events have a timestamp included in addition to the block number, but this will take significantly more time.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

**Special flags**:

- `--timestamps` Add timestamps to events. Will use up much more time and send more requests.
- `--from` Block to query from, defaults to 0.
- `--to` Block to query until, defaults to latest.

## `contract:multi-read`

::: example

Read ownerOf for multiple NFTs.

```sh
ct -n stripchain --address 0x3184606d90a56d264EC6f3E50aC0afBD60F43100 contract:multi-read ownerOf 1000000 1000001 1000002 1000003 1000004
```

Print results to terminal instead of writing to a file.

```sh
ct -n stripchain --address 0x3184606d90a56d264EC6f3E50aC0afBD60F43100 contract:multi-read ownerOf 1000000 1000001 1000002 1000003 1000004 -o -
```
:::

Call a contract multiple times with different arguments.

multi-read batches the calls to speed up requests significantly when compared to making each call separately.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

## `contract:read`

::: example

Read the name function on a contract.

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read name
```

Read the balanceOf function with an address argument

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read balanceOf 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503
```
:::

Call a contract to read a value.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--quiet` (-q)](./flags.md#quiet)

## `contract:write`

::: example

Send Goerli Food Coin tokens using the ERC-20 transfer function.

```sh
ct -n goerli -f goerli-account --address 0xFf255f8A7Cf00D68a123a2553a7d0cdCA63f61c3 contract:write transfer 0x7febB7c2d3Eed50a24e3604A89BC92375aeF1C2e 1e18
```
:::

Send a transaction to a smart contract, writing data to it.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--apiminer-url`](./flags.md#apiminer-url), [`--apiminer-token`](./flags.md#apiminer-token), [`--address`](./flags.md#address), [`--abi`](./flags.md#abi), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output), [`--file` (-f)](./flags.md#file), [`--private-key` (-k)](./flags.md#private-key), [`--gasprice` (-g)](./flags.md#gasprice), [`--force-gasprice`](./flags.md#force-gasprice), [`--gas-priority` (-p)](./flags.md#gas-priority), [`--gaslimit`](./flags.md#gaslimit)

**Special flags**:

- `--nonce` Override the automatic transaction nonce with a specific number. You can also adjust the automatic nonce by prefixing the number with + or -, for example +1, -1, +2, and so on.
- `--dry` Prepare the transaction (ie. dry-run) without sending it, showing gas values and potential errors.
- `--noconfirm` Send the transaction, but don't wait for it to confirm.
- `--nowait` Don't wait 3 seconds before sending the transaction.

# eth

Common Ethereum commands.

## `eth:account`

::: example

Generate a random account and output the encrypted JSON.

```sh
ct eth:account
```

Generate a random account and save it to a file called `account.json`.

```sh
ct eth:account -o account.json
```
:::

Generate and encrypts a new random Ethereum account.

The new account is a random Ethereum account in the standard encrypted JSON format, a password is prompted for.

For security reasons the password is always prompted for when this account is used. If you want an account for automation, you may want to use `eth:private-key` instead.

**Common flags**: [`--output` (-o)](./flags.md#output)

## `eth:block`

::: example

Get the latest block for the default chain.

```sh
ct eth:block
```

Get a block by its block number.

```sh
ct eth:block 16643109
```

Get a block by its block hash.

```sh
ct eth:block 0xb5a47454da4b54e33bc4278aad86df5808d3e0fcbdcd97f3a923a55531eb5437
```
:::

Get the data for a block.

eth:block outputs the raw data for an Ethereum block with a list of transaction hashes.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

## `eth:bytecode`

::: example

Read bytecode for two addresses, one of which is not a smart contract.

```sh
ct eth:bytecode 0x3CaDF33783128EDCBA3f0026773F8d5ce9eC03ba 0x5D64D850c8368008aFB39224E92aD0DcEFf3CF38
```
:::

Get the bytecode for Ethereum addresses.

Bytecode is the low-level code for smart contracts, so the result will be empty for addresses that are not smart contracts.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

## `eth:private-key`

::: example

Generate a random account and output the private key and address.

```sh
ct eth:private-key
```

Generate a random account and save it to a file called `account.key`.

```sh
ct eth:private-key -o account.key
```
:::

Generate a new random Ethereum account.

Outputs an Ethereum account's private key and the corresponding address using a system secure random source.

Because the private key **is not encrypted**, great care must be taken to keep them safe. You may consider using `eth:account` instead if that's a concern.

**Common flags**: [`--output` (-o)](./flags.md#output)

## `eth:tx`

::: example

Get a Mainnet transaction.

```sh
ct eth:tx -n mainnet 0x2c34792a4559a102c83f67d98c8e88ab46439a89377c7dc791b85d518ec343b5
```
:::

Get a transaction and its receipt by hash.

eth:tx also shows any data or error the transaction may have returned, and will attempt to decode it if the contract ABI is available.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key)

## `eth:vanity`

::: example

Find wallets starting with f00d, C0DE or da0f00d.

```sh
ct eth:vanity f00d ^C0DE da0f00d
```

Find contract addresses with C0DE or da0c0de.

```sh
ct eth:vanity -c ^C0DE da0c0de
```
:::

Generate vanity addresses for Ethereum.

This command will generate random account addresses and save any that start with one of the given words.

Longer text will take much longer to generate. Each additional character takes roughly 16 times longer.

Case sensitivity: You can use ^ (caret or circumflex) to mark a change in case. Characters after the first caret will be considered case-sensitive. If a second caret is present, characters after that are no longer case-sensitive.

For example:

ct eth:vanity ^F00D^bad

Would mean "F00D" is case-sensitive, but "bad" is not.

Regular expressions: You can also use regular expressions by starting and ending the word with "/". You can provide flags after the ending "/".

For example:

ct eth:vanity /^[df]00d/i

Would search for "f00d" or "d00d", and is case-insensitive due to the i flag.


**Common flags**: [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug)

**Special flags**:

- `--output` (`-o`) Folder to write accounts to, defaults to 'vanity'.
- `--contract` (`-c`) Generate contract addresses instead of account addresses.
- `--sensitive` (`-s`) Make all searches case-sensitive. You can prefix a word with ^ to make one word case-sensitive.
- `--limit` (`-l`) Stop searching after this many accounts have been found.

# etherscan

Load and use data from Etherscan.

## `etherscan:balances`

Get all holders and their balances for an ERC-20 token.

etherscan:balances works by first retrieving a list of all transfers for the token, and then building the balances by replaying all the transfers.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key)

**Special flags**:

- `--output` (`-o`) File to write data to.

## `etherscan:transfers`

::: example

Get transfer for a token with the given contract address.

```sh
ct etherscan:transfers 0xdef1da03061ddd2a5ef6c59220c135dec623116d
```

Get transfer up to a given date and time.

```sh
ct etherscan:transfers 0xdef1da03061ddd2a5ef6c59220c135dec623116d -u "2021-03-17 06:00"
```
:::

Get transfer history for a token.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output), [`--no-prices`](./flags.md#no-prices)

**Special flags**:

- `--until` (`-u`) Only include transfer until this date and time. UTC is assumed unless timezone is specified.

# ethplorer

Data from Ethplorer.

## `ethplorer:contributions`

::: example

Contributions to the given address.

```sh
ct ethplorer:contributions 0x7dce8a3541b1bf6ce947392b994c77f32f1e59ff
```
:::

Read and rank ETH contributions to addresses.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--ethplorer-key`](./flags.md#ethplorer-key), [`--no-prices`](./flags.md#no-prices)

**Special flags**:

- `--output` (`-o`) File to write data to.
- `--dump` Use data from a dump directory instead of calling APIs.
- `--no-dump` Don't dump data from external sources. Use this if the command is run often to avoid disk space bloat.
- `--json` Output data as JSON instead of CSV.
- `--timelimit` (`-t`) Limit search to include transfers no older than this timestamp.

## `ethplorer:token-info`

::: example

Get information on the given token address.

```sh
ct ethplorer:token-info 0x4dc3643dbc642b72c158e7f3d2ff232df61cb6ce
```
:::

Get information on a token.

**Common flags**: [`--ethplorer-key`](./flags.md#ethplorer-key)

**Special flags**:

- `--dump` Use data from a dump directory instead of calling APIs.
- `--output` (`-o`) File to write data to.

## `ethplorer:transfer-history`

::: example

Get the latest transfers for the two given addresses.

```sh
ct ethplorer:transfer-history 0xad76caefd3f862716297bba008cfc225e2c8813e 0xc11b8cc936473e8f55db67957beccc7cd6f1da06
```
:::

Read latest token transfers for addresses.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--ethplorer-key`](./flags.md#ethplorer-key), [`--no-prices`](./flags.md#no-prices)

**Special flags**:

- `--output` (`-o`) File to write data to.
- `--dump` Use data from a dump directory instead of calling APIs.
- `--no-prima` Skip finding PrimaBlock contracts.

# nft

Tools for non-Fungible Tokens, such as ERC-721.

## `nft:balances`

::: example

```sh
ct nft:balances 0x9808226ed04e92f9380da67c5606354fae5891b0
```
:::

Get all holders for a NFT contract with number of items held.

nft:balances specifically loads the number of NFTs held by addresses, rather than list of the NFTs held.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key)

**Special flags**:

- `--output` (`-o`) File to write the balances to.
- `--timestamp` (`-t`) Get balances at a specific time.

## `nft:holders`

::: example

```sh
ct nft:holders 0x9808226ed04e92f9380da67c5606354fae5891b0
```
:::

Get a list of NFTs from a contract with the holder address for each.

nft:holders lists the holder for each NFT, in contrast to nft:balances that lists how many tokens each holder has.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key), [`--quiet` (-q)](./flags.md#quiet), [`--json`](./flags.md#json), [`--debug`](./flags.md#debug), [`--output` (-o)](./flags.md#output)

**Special flags**:

- `--timestamp` (`-t`) Get holders at a specific time.

# telescope

Telescope visualizations.

## `telescope:csv`

Render a Telescope video based on an existing CSV of transfers.

telescope:csv is identical to telescope:transfers aside from using a CSV file instead of the token's contract address.

telescope:csv expects the CSV file to have the following columns:

from, to, amount, USD value, timestamp, transaction hash, contractAddress, blockNumber

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key)

**Special flags**:

- `--output` (`-o`) File to write video to.
- `--until` (`-u`) Only include transfer until this date and time. UTC is assumed unless timezone is specified.
- `--subtitle` Provide a custom subtitle. By default it's the token's name followed by the end date.

## `telescope:transfers`

::: example

Create a Telescope video from beginning to March 17th.

```sh
ct telescope:transfers 0xdef1da03061ddd2a5ef6c59220c135dec623116d -u "2021-03-17 19:08"
```

Create a video with two logos added to the video.

```sh
ct telescope:transfers 0xdef1da03061ddd2a5ef6c59220c135dec623116d -u "2021-03-17 19:00" ../logo1.png ../logo2.png
```
:::

Create a Telescope video for a token.

The Telescope video shows the network of token holders and transfers as they happened over time, using a graph representation.

You'll achieve best results if you limit the length of the video using the --until flag, because otherwise the video can be very long.

**Common flags**: [`--node`](./flags.md#node), [`--network` (-n)](./flags.md#network), [`--infura-key`](./flags.md#infura-key), [`--etherscan-key`](./flags.md#etherscan-key)

**Special flags**:

- `--output` (`-o`) File to write video to.
- `--until` (`-u`) Only include transfer until this date and time. UTC is assumed unless timezone is specified.
- `--subtitle` Provide a custom subtitle. By default it's the token's name followed by the end date.

