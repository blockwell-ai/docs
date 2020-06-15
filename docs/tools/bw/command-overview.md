---
title: Command Overview
autonav:
    order: 0
---

# Command Overview 

Below is a quick reference of the different commands available.

## Commands

| Command | Description |
|---|---|
| transactions [count] | Shows statistics on the latest transactions on the blockchain. |
| hashrate [options] &lt;blocks&gt; [toblock] | Calculate the network hashrate for the given number of latest blocks. |
| [send](./commands.md#send) &lt;recipient&gt; &lt;amount&gt; | Sends Tokens to the recipient from the configured account, with Tokens given in whole units. |
| [transfers](./commands.md#transfers) [options] [to] [depth] | Reads past Token transfers. |
| [balance](./commands.md#balance) &lt;account&gt; | Gets the Token balance of the given account. |
| [token-balances](./commands.md#token-balances) [options] &lt;address&gt; | Gets all Token balances for the given Token contract address. |
| [receipt](./commands.md#receipt) &lt;hash&gt; | Loads a transaction receipt by the given hash. |
| [account](./commands.md#account) &lt;name&gt; | Creates a new account in the file &lt;name&gt;.json. |
| [private-key](./commands.md#private-key) | Creates a new account and prints the address and private key. |
| [gas](./commands.md#gas) [options] [type] | Get the current gas price or other values from ETH Gas Station. |
| [ether](./commands.md#ether) &lt;recipient&gt; &lt;amount&gt; | Sends Ether to the recipient from the configured account, with Ether given in whole units. |
| [balance-eth](./commands.md#balance-eth) [options] &lt;address&gt; | Query the Ether balance of an address. |
| [last-gas](./commands.md#last-gas) &lt;address&gt; | Find the last transaction of an address and print its info. |
| [last-activity](./commands.md#last-activity) [options] &lt;address&gt; | Find the last transaction the given address submitted and output the date. |
| [contract-call](./commands.md#contract-call) &lt;method&gt; [arguments...] | Make an arbitrary contract method call (non-transaction). |
| [multi-call](./commands.md#multi-call) [options] &lt;method&gt; [arguments...] | Make contract view calls on a list of arguments, where each arguments should be a comma-separated list. |
| [contract-send](./commands.md#contract-send) [options] &lt;method&gt; [arguments...] | Make an arbitrary contract method &quot;send&quot; as a transaction. |
| [contract-deploy](./commands.md#contract-deploy) [options] &lt;build-file&gt; [arguments...] | Deploy a contract from a Truffle build file. |
| [contract-bytecode](./commands.md#contract-bytecode) &lt;build-file&gt; [arguments...] | Output deployable bytecode with constructor arguments encoded from a Truffle build file. |
| [function-signature](./commands.md#function-signature) &lt;function-string&gt; | Calculates the ABI signature of the given function string. |
| [topic0](./commands.md#topic0) &lt;event-string&gt; | Calculates the topic0 hash for an event type. |
| [functions](./commands.md#functions) [abi-file] | Lists all functions in the ABI from the file or URL if given, or the default ABI. |
| [events](./commands.md#events) [abi-file] | Lists all events in the ABI from the file or URL if given, or the default ABI. |
| [decode-input](./commands.md#decode-input) &lt;data&gt; | Decodes ABI encoded input data to functions. |
| [abi](./commands.md#abi) [options] &lt;source&gt; | Loads an ABI from the source and saves it to file. Source can be a contract address or web URL. |
| [code](./commands.md#code) [options] &lt;source&gt; | Loads the contract code from the source and saves it to file. Source can be a contract address or| | web URL. |
| [logs](./commands.md#logs) &lt;address&gt; [topic0] | Get past event logs for the given contract address, optionally filtered by topic0. |
| [get-bytecode](./commands.md#get-bytecode) &lt;address&gt; | Get the bytecode of a given address. |
| [wei](./commands.md#wei) [options] &lt;value&gt; | Convert Ether to Wei, or other decimal counts with -d. |
| [from-wei ](./commands.md#from-wei )[options] &lt;value&gt; | Convert Wei to Ether, or other decimal counts with -d. |
| [has-functions](./commands.md#has-functions) &lt;address&gt; [functions...] | Attempts to detect which functions exist in the given contract address. |
| [is-contract](./commands.md#is-contract) [address...] | Detects which of the given addresses are contracts |
| [vanity](./commands.md#vanity) [options] &lt;type&gt; &lt;text&gt; | Generate a vanity address. |
| [help](./commands.md#help) [command] | Display help for a command. |

## Options

| | |
|---|---|
| -V, --version | output the version number |
| -a, --account &lt;account file&gt; | File containing the encrypted account |
| -p, --password &lt;password file&gt; | File containing the account password |
| -k, --privatekey &lt;key&gt; | Private key, can be used instead of account and password |
| -f, --keyfile &lt;file&gt; | Private key file instead of account and password |
| -n, --network &lt;name&gt; | Use a specific Ethereum network found in the config |
| -q, --quiet | Suppress logging output from console |
| --abi &lt;file&gt; | ABI file to use, or Truffle build file |
| --abiraw &lt;abi&gt; | ABI as escaped JSON |
| --address &lt;address&gt; | Contract address |
| --gasprice &lt;price&gt; | Specify a gas price in Gwei instead of automatic |
| --gaslimit &lt;limit&gt; | Specify a gas limit instead of automatic |
| --nonce &lt;nonce&gt; | Specify a nonce number, +X, or -X to control the nonce used |
| --noconfirm | Don&apos;t wait for a confirmation for a transaction, exit after it&apos;s sent |
| --plain | Plain output without labels or colors. This also sets --quiet |
| --json | JSON output. |
| --fromblock &lt;block&gt; | When querying transfers, start from the given block |
| -h, --help | display help for command |
