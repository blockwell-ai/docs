---
title: Commands
sidebarDepth: 2
---

# Commands

## Transaction commands

These are commands that perform a transaction on the blockchain.

With all of these commands, you must provide exactly one of:

- [`--account`](global-options.md#account-account-file)
- [`--privatekey`](global-options.md#privatekey-key)
- [`--keyfile`](global-options.md#keyfile-file)

### send

Sends ERC-20 tokens from the configured account to the given address.

Arguments:

- `recipient` Address of the recipient
- `amount` Token amount to send, in whole units. The number of decimals
  is calculated and applied automatically.

Example:

```
./bw -f keyfile send 0x632777aeb73f955a660817d5f1ab1a36365485aa 1.2
```

### ether

Sends Ether to another address.

Arguments:

- `recipient` Address of the recipient
- `amount` Amount of ETH to send, in whole units.

Example:

```
./bw -f keyfile ether 0x632777aeb73f955a660817d5f1ab1a36365485aa 5
```

### contract-deploy

Deploys a smart contract on the blockchain.

Arguments:

- `build-file` A [Truffle-style build file](./build-file.md) of the contract.
- `arguments...` The remaining arguments will all be given to the smart
  contract's constructor as arguments.
  
::: warning
At this time all arguments to this command must be provided in their raw 
form. For example, if you're specifying a token amount with 18 decimals and want
to specify 5 tokens, you would enter `5000000000000000000`.
:::

Options: 

- `--dry` Prepares the deployment and calculates gas limit, but does not submit
  the transaction.

Example:

```
./bw -f keyfile contract-deploy MyContract.json "First argument" 123
```

### contract-send

Send a transaction with a smart contract function call.


Arguments:

- `method` The name of the method (aka. function) to be called with the transaction.
- `arguments...` The remaining arguments will all be given to the function as its
  arguments.

::: warning
At this time all arguments to this command must be provided in their raw 
form. For example, if you're specifying a token amount with 18 decimals and want
to specify 5 tokens, you would enter `5000000000000000000`.
:::

Options: 

- `--ether <value>` Send ETH with the transaction. Enter in whole ETH, not Wei.

Example:

```
./bw -f keyfile contract-send addAdmin 0x632777aeb73f955a660817d5f1ab1a36365485aa
```


