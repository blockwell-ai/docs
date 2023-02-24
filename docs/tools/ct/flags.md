---
title: Common Flags
autonav:
    order: 2
---

# Common Flags

These are the flags that are common to many different chain-tool commands.

## abi

Path to an ABI file for the contract. In most cases this shouldn't be necessary, as the ABI is loaded automatically.

## address

Contract address to use.

## apiminer-url

Base URL for API Miner. This should not be needed in most cases, it's only if you want to use a custom API Miner.

## debug

Print debug messages.

## dump

Use a custom data dump directory to cache API results instead of the default based on the current date.

## etherscan-key

Etherscan API key.

## ethplorer-key

Ethplorer API Key.

## file

**Shortcut** `-f`

File to read an Ethereum account from for sending transactions.

## force-gasprice

Force the transaction to be sent with a gas price even if the chain uses EIP-1559.

## gas-priority

**Shortcut** `-p`

Use a specific gas priority, in gwei, for EIP-1559 chains.

## gaslimit

Use a custom gas limit instead of an automatic one.

## gasprice

**Shortcut** `-g`

Override automatic gas price, specified in gwei.

## infura-key

Infura API key.

## json

Output in JSON format.

## key

**Shortcut** `-k`

GCP authentication key file path. See [the GCP docs for more info](https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account)

## network

**Shortcut** `-n`

Ethereum network to use, or chain ID.

## no-prices

Skip pricing data.

## node

URL for the Ethereum node to use. Generally this is only needed if you want to use a specific node, in most cases `--network` (-n) will automatically connect to the node.

## output

**Shortcut** `-o`

File to write output to, or - for stdout.

## private-key

**Shortcut** `-k`

Private key for an Ethereum account.

## quiet

**Shortcut** `-q`

Suppress log messages.

## since

Date since in YYYY-MM-DD format to limit search to.

## until

Date until in YYYY-MM-DD format to limit search to.

