---
title: Commands
autonav:
    order: 1
---

# Commands

## Creating accounts

These commands create Ethereum accounts.

### account

Creates a new encrypted JSON-storage account.

**Arguments**:

- `name` Name of the file to save the account to, `.json` will be added
  automatically.

**Example**:

```bash
./bw account myaccount
```

#### Account usage

To use an account created this way with bw, you need to temporarily save the
password you set into a file, and then provide the account file and password
file to bw. For example, if the account file is `myaccount.json` and the
password file is `mypassword`, run:

```bash
./bw -a myaccount.json -p mypassword ...
```

---

### private-key

Generates an unsecured private key for a new account.

::: warning
Accounts saved as plain private keys are not secure if someone gains access
to your computer, so only use these for testing and low-value scenarios.
:::

**Example**:

```bash
./bw private-key
```

Save the private key to a file:

```bash
./bw private-key --plain > myaccount.key
```

#### Account usage

To use an account created this way with bw, save it to a file with the
`--plain` output like above, and then provide it with the `-f` option:

```bash
./bw -f myaccount.key ...
```

You can also provide the private key directly to the command without saving
to a file using the `-k` option:

```bash
./bw -k 0xc5f4a5c228f422a52532b69bb2d89f464bbc283580dfd3e9752e306b15b02107 ...
```

---

### vanity

Generates an account with a customized address. For example, you could create
an account that begins with `0xface`.

Note that the more characters you include, the longer it takes to find an
address that matches. Even on a high-end computer it can take days just to
find 6-7 characters.

The account itself is output the same way as with [private-key](#private-key).

**Arguments**:

- `type` The type of search. Can be `left` (beginning), `right` (end) or
  `any`.
- `text` The text to search for. This can only contain numbers (0-9) and
  letters up to f (a-f).
  
**Options**:

- `--contract` or `-c` Finds a contract address instead of an account address.
  It will also display the nonce you need to use to get the found contract
  address.
- `--sensitive` or `-s` Makes the text search case-sensitive.

::: warning
Accounts saved as plain private keys are not secure if someone gains access
to your computer, so only use these for testing and low-value scenarios.
:::

**Example**:

Create an account that begins with `0xface`:

```bash
./bw vanity left face
```

Same as the first example, but save it to a file instead of displaying it:

```bash
./bw vanity left face --plain > 0xface.key
```

#### Account usage

To use an account created this way with bw, save it to a file with the
`--plain` output like above, and then provide it with the `-f` option:

```bash
./bw -f 0xface.key ...
```

## Transaction commands

These are commands that perform a transaction on the blockchain.

With all of these commands, you must provide exactly one of:

- [`--account`](#account-account-file)
- [`--privatekey`](#privatekey-key)
- [`--keyfile`](#keyfile-file)

### send

Sends ERC-20 tokens from the configured account to the given address.

**Arguments**:

- `recipient` Address of the recipient
- `amount` Token amount to send, in whole units. The number of decimals
  is calculated and applied automatically.

**Example**:

```bash
./bw -f keyfile send 0x632777aeb73f955a660817d5f1ab1a36365485aa 1.2
```

---

### ether

Sends Ether to another address.

**Arguments**:

- `recipient` Address of the recipient
- `amount` Amount of ETH to send, in whole units.

**Example**:

```bash
./bw -f keyfile ether 0x632777aeb73f955a660817d5f1ab1a36365485aa 5
```

---

### contract-deploy

Deploys a smart contract on the blockchain.

**Arguments**:

- `build-file` A [Truffle-style build file](build-file.md) of the contract.
- `arguments...` The remaining arguments will all be given to the smart
  contract's constructor as arguments. Supports [Argument Formats](./arguments.md).
  
::: warning
At this time all arguments to this command must be provided in their raw 
form. For example, if you're specifying a token amount with 18 decimals and want
to specify 5 tokens, you would enter `5000000000000000000`.
:::

**Options**: 

- `--dry` Prepares the deployment and calculates gas limit, but does not submit
  the transaction.

**Example**:

```bash
./bw -f keyfile contract-deploy MyContract.json "First argument" 123
```

---

### contract-send

Send a transaction with a smart contract function call.

**Arguments**:

- `method` The name of the method (aka. function) to be called with the transaction.
- `arguments...` The remaining arguments will all be given to the function as its
  arguments. Supports [Argument Formats](./arguments.md).

::: warning
At this time all arguments to this command must be provided in their raw 
form. For example, if you're specifying a token amount with 18 decimals and want
to specify 5 tokens, you would enter `5000000000000000000`.
:::

**Options**: 

- `--ether <value>` Send ETH with the transaction. Enter in whole ETH, not Wei.
- `--dry` Shows the function and arguments, but doesn't send the transaction.

**Examples**:

```bash
./bw -f keyfile contract-send addAdmin 0x632777aeb73f955a660817d5f1ab1a36365485aa
```

You can always specify a different contract address using 
[`--address`](#address-address):

```bash
./bw -f keyfile --address 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae \
    contract-send addAdmin 0x632777aeb73f955a660817d5f1ab1a36365485aa
```

## Reading contracts

These commands read data from the blockchain related to contracts.

### contract-call

Makes a view (read-only) function call on a smart contract.

**Arguments**:

- `method` The name of the method (aka. function) to be called.
- `arguments...` The remaining arguments will all be given to the function as its
  arguments. Supports [Argument Formats](./arguments.md).

**Examples**:

```bash
./bw contract-call balanceOf 0x632777aeb73f955a660817d5f1ab1a36365485aa
```

You can always specify a different contract address using 
[`--address`](#address-address):

```bash
./bw --address 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae \
    contract-call balanceOf 0x632777aeb73f955a660817d5f1ab1a36365485aa
```

---

### balance

A command to call `balanceOf` on an ERC-20 contract to get an account's balance
of tokens.

This is basically the same as using `contract-call balanceOf`, except it performs
decimal conversion automatically.

**Arguments**:

- `account` Account address to get balance for

**Examples**:

```bash
./bw balance 0x632777aeb73f955a660817d5f1ab1a36365485aa
```

---

### multi-call

A special multi-version of [`contract-call`](#contract-call) that calls the same
function multiple times with different arguments.

**Arguments**:

- `method` The name of the method (aka. function) to be called for each set of arguments.
- `arguments...` The arguments to be passed to the function. Different function
  arguments should be separated by spaces, and multiple values separated by commas.
  Supports [Argument Formats](./arguments.md).
  
**Options**:

- `--decimals <value>` Converts output with a given number of decimals.

**Examples**:

Call `balanceOf` for both of the two addresses:

```bash
./bw multi-call balanceOf \
    0x5027C909AAa8672B26AD50DefCfd32Db5A0639E5,0x00Aa9F6706Cb0fD34bF4833daf723987E6B249F5
```

If you're calling a function with multiple arguments, just separate the arguments
by spaces. Here's calling allowance both ways for two addresses:

```bash
./bw multi-call allowance \
    0x5027C909AAa8672B26AD50DefCfd32Db5A0639E5,0x5e3A41Ea023F84F6A75C2b2Db9eE3440c9B81d9F \
    0x00Aa9F6706Cb0fD34bF4833daf723987E6B249F5,0x612d80530A47086e349F4A28CF48C38aC8BfCF35
```

This will first call:

```
allowance(0x5027C909AAa8672B26AD50DefCfd32Db5A0639E5, 0x00Aa9F6706Cb0fD34bF4833daf723987E6B249F5)
```

And then:

```
allowance(0x5e3A41Ea023F84F6A75C2b2Db9eE3440c9B81d9F, 0x612d80530A47086e349F4A28CF48C38aC8BfCF35)
```

---

### transfers

Reads all token transfers from a contract and outputs them in CSV format.

This command uses the contract address from [`config.yaml`](configuration.md),
which you can override with [`--address`](#address-address)

**Arguments**:

- `to` *Optional.* Only output transfers to this address.

**Examples**:

```bash
./bw transfers
```

Read transfers for the contract `0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae`:

```bash
./bw --address 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae transfers
```

Only read transfers to the address `0xAaf70e052b76C9Bd177e24A0E249f17CC3486eA0`:

```bash
./bw transfers 0xAaf70e052b76C9Bd177e24A0E249f17CC3486eA0
```

Put the output into a file called `transfers.csv`:

```bash
./bw transfers --quiet > transfers.csv
```

---

### token-balances

Reads all token transfers from a contract and calculates the token balance of every
account that holds any of the tokens.

The default output is a spreadsheet in CSV format. You can optionally get JSON output
using the [`--json`](#json) flag.

**Arguments**:

- `address` Token contract address to calculate for.

**Examples**:

```bash
./bw token-balances 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae
```

Put the output into a file called `balances.csv`:

```bash
./bw token-balances 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae --quiet > balances.csv
```

---

### logs

Reads event logs from a smart contract and outputs them in JSON format.

**Arguments**:

- `address` Token contract address to read logs from.
- `topic0` *Optional.* Only show logs with this topic0 value. You can use the
  [topic0](#topic0) command to get the correct value.

**Examples**:

```bash
./bw logs 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae
```

Only get logs for the `AdminAdded` event:

```bash
./bw logs 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae 0x44d6d25963f097ad14f29f06854a01f575648a1ef82f30e562ccd3889717e339
```

The topic0 value was calculated for `AdminAdded` with the following command:

```bash
./bw topic0 "AdminAdded(address)"
```

## Other contract-related commands

These commands deal with smart contracts, but don't read the contract directly.

### get-bytecode

Reads the raw bytecode of a contract from the blockchain.

**Arguments**:

- `address` Contract address to get the bytecode for.

**Example**:

```bash
./bw get-bytecode 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae
```

---

### is-contract

Checks if the given addresses are smart contracts

**Arguments**:

- `addresses...` One or more addresses separated by spaces

**Example**:

```bash
./bw is-contract 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae
```

Multiple addresses at once:

```bash
./bw is-contract 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae 0xAaf70e052b76C9Bd177e24A0E249f17CC3486eA0
```

---

### has-functions

Attempts to detect if a contract implements certain functions by analyzing
the bytecode.

::: warning
There is a small chance for false positives with the bytecode analysis. They should
be very rare, but due to the nature of how functions are stored in the bytecode it
is practically impossible to have 100% certainty.
:::

**Arguments**:

- `address` Address of the contract to analyze.
- `functions...` List of functions, separated by spaces, to look for. Each function
  can be specified using its signature or 4 byte hash.
  
Alternatively, you can omit `functions...` and specify a contract ABI instead
with [`--abi`](#abi) instead, in which case all functions from
the ABI will be looked for.

**Examples**:

Functions can be specified using their signature:

```bash
./bw has-functions 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae \
    'transfer(address,uint256)' \
    'approve(address,uint256)'
```

Or using the function's [4 byte hash](https://www.4byte.directory/)

```bash
./bw has-functions 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae \
    0xa9059cbb \
    0x095ea7b3
```

Using an ABI:

```bash
./bw has-functions --abi erc20.abi 0x212D95FcCdF0366343350f486bda1ceAfC0C2d63
```

---

### contract-bytecode

Encodes a contract for deployment and then outputs the data to be deployed.

This can be useful if you want to deploy a contract using an account that normally
doesn't support deploying contracts.

**Arguments**:

- `build-file` A [Truffle-style build file](build-file.md) of the contract.
- `arguments...` The remaining arguments will all be given to the smart
  contract's constructor as arguments.
  
::: warning
At this time all arguments to this command must be provided in their raw 
form. For example, if you're specifying a token amount with 18 decimals and want
to specify 5 tokens, you would enter `5000000000000000000`.
:::

**Example**:

```bash
./bw -f keyfile contract-bytecode MyContract.json "First argument" 123
```

---

### functions

Displays all functions found in the given ABI file with the 4 byte hash for each
function.

**Arguments**:

- `abi-file` The ABI file for the contract.

**Example**:

```bash
./bw functions lib/erc20.abi
```

---

### events

Displays all events found in the given ABI file.

**Arguments**:

- `abi-file` The ABI file for the contract.

**Example**:

```bash
./bw events lib/erc20.abi
```

---

### function-signature

Calculates the 4 byte hash of a function given its signature.

**Arguments**:

- `function-signature` The full signature of the function, including the name and each
  argument type.

**Example**:

```bash
./bw function-signature "transfer(address,uint256)"
```

---

### topic0

Calculates the topic0 value for a smart contract event.

**Arguments**:

- `event-signature` The full signature of the event, including the name and each
  argument type.

**Example**:

```bash
./bw topic0 "AdminAdded(address)"
```

---

### decode-input

Decodes the input data of a contract calling transaction.

**Arguments**:

- `data` The input data from the transaction.

**Example**:

```bash
./bw decode-input 0xa9059cbb0000000000000000000000001344de20465e0d04ec3a6dfd80c6e02e40c3c5600000000000000000000000000000000000000000000000056bc75e2d63100000
```

## Other commands

### balance-eth

Gets the ETH balance of an account.

**Arguments**:

- `address` Account address to get balance for.

**Options**:

- `--wei` or `-w` Outputs balance in Wei instead of whole ETH.

---

### receipt

Reads and outputs a transaction receipt from the blockchain.

**Arguments**:

- `hash` Transaction hash to get a receipt for.

**Example**:

```bash
./bw receipt 0x84fffafbd68c42fc281cf1bb1ecef5460554b0d6b7a2734a2737f418a21bec70
```

---

### gas

Gets the current gas price from [ETH Gas Station](https://ethgasstation.info/).

**Arguments**:

- `type` *Optional.* Type of gas price from [ETH Gas Station](https://ethgasstation.info/).

`type` can be one of:

 - `block_time` Average block time
 - `blockNum` Block number
 - `speed` Speed
 - `safeLow` Safe low gas price
 - `average` Average gas price
 - `fast` Fast gas price
 - `fastest` Fastest gas price
 - `default` Calculates the average of `average` and `safeLow`, and then adds 2 gwei

If no `type` is provided, `default` is used.

**Options**:

- `--wei` or `-w` Output in Wei instead of Gwei.
- `--raw` or `-r` Output ETH Gas Station's raw format.

**Examples**:

Get the default gas price:

```bash
./bw gas
```

Get the `safeLow` gas price in Wei:

```bash
./bw gas -w safeLow
```

---

### wei

Convert Ether to Wei.

**Arguments**:

- `value` The ETH amount to convert to Wei.

**Options**:

- `--decimals` or `-d` The number of decimals to use instead of Ether's 18.

**Examples**:

Convert 5 ETH to Wei:

```bash
./bw wei 5
```

Convert 5 tokens to its Wei equivalent when the token has 6 decimals:

```bash
./bw wei -d 6 5
```

---

### from-wei

Convert Wei to Ether.

**Arguments**:

- `value` The Wei amount to convert to ETH.

**Options**:

- `--decimals` or `-d` The number of decimals to use instead of Ether's 18.

**Examples**:

Convert Wei to ETH:

```bash
./bw from-wei 5000000000000000000
```

Convert 5 tokens with 6 decimals in its Wei format to whole tokens:

```bash
./bw from-wei -d 6 5000000
```

## Options For All Commands

Below is a list of options that apply to all the tool's commands.

#### `--account <account file>`

> shortcut `-a <account file>`

Specifies an encrypted JSON store file to use as the Ethereum account to send
transactions with.

This option must always be accompanied by `--password`.


#### `--password <password file>`

> shortcut `-p <password file>`

Specifies a text file with the password to the encrypted account specified with
`--account`.

It is recommended that this file be protected with restricted file permissions
and only created while you're using bw. Delete the file afterwards to help keep
the password safe.


#### `--privatekey <key>`

> shortcut `-k <key>`

Use the given private key directly as the account to send transactions with.

**Note!** This is highly insecure, so it should only be used for testing and
low-value situations.


#### `--keyfile <file>`

> shortcut `-f <file>`

Reads the account private key from the given file. This private key is then 
used as the account to send transactions with.

**Note!** This is highly insecure, so it should only be used for testing and
low-value situations.


#### `--network <name>`

> shortcut `-n <name>`

> example `-n rinkeby`

Use the given network, or chain, instead of the default one in `config.yaml`.


#### `--address <address>`

> example `--address 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae`

Sets the contract address to use with contract interactions, overriding the
default from `config.yaml`.


#### `--quiet`

> shortcut `-q`

Suppresses all logging information from the output.


#### `--plain`

Makes all output plain without special formatting, and without coloring.

Also sets [`--quiet`](#quiet).


#### `--json`

Specifies that data output should be in JSON format. This does not work with
all commands.

Also sets [`--quiet`](#quiet).


#### `--abi`

> example `--abi MyContract.abi`

Sets the ABI file to use for contract interactions, overriding the default from
`config.yaml`.

This can be an ABI file directly, or a [Truffle-style build file](build-file.md)
that's a JSON object with the key `abi` containing the ABI.


#### `--abiraw`

> example `--abiraw '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}]'`

Sets the ABI to be used directly from the given value.


#### `--gasprice <price>`

> example `--gasprice 4`

Sets a specific gas price to be used instead of an automatic price.

The value given should be in gwei.


#### `--gaslimit <limit>`

> example `--gaslimit 200000`

Sets a specific gas limit for transactions instead of an automatically calculated
one.


#### `--nonce <nonce>`

> example `--nonce 132`  
> example `--nonce -0`  
> example `--nonce +2`

Sets the contract address to use with contract interactions, overriding the
default from `config.yaml`.

This can also be given with a preceding plus (+) or minus (-), in which case the
value will be added to or subtracted from the last nonce.

In other words, you can use `--nonce -0` to tell bw to use a nonce that's 0
less than the last nonce. In practice this means the new transaction will
overwrite your last one.

If you provide `--nonce +1`, that would set it to the automatically calculated
nonce, which is your last nonce plus 1.


#### `--noconfirm`

If specified, bw will not wait for transactions to be included in a block. Instead,
after the transaction is sent and is pending on the node, bw will exit immediately.


#### `--fromblock <block>`

> example `--fromblock 5000000`

Sets the lower-bound block when using commands that search the blockchain. For
example, if used with the [`transfers`](#transfers) command, it would
only find transfers from that block onwards.


