---
title: Argument Format
autonav:
    order: 3
---

# Argument Format

There are a few special ways to provide arguments to bw commands.

## Decimals

A lot of numbers on Ethereum use a large number of decimals which need to be
converted. Most tokens and ETH itself have 18 decimals for every day use, but
the blockchain itself doesn't know about decimals.

For example, when you say `1 ETH`, the blockchain thinks `1000000000000000000`,
in other words 1 followed by 18 zeroes for 18 decimals. If you tell the blockchain
`1` for ETH, it will think you meant `0.000000000000000001 ETH`.

Some bw commands already convert this automatically ([send](./commands.md#send),
[ether](./commands.md#ether)), but it's more complicated with more generic commands
like [contract-call](./commands.md#contract-call), 
[contract-send](./commands.md#contract-send) and
[contract-deploy](./commands.md#contract-deploy).

For those commands, there is a special decimal format you can use to make it
easier:

```
<number>d[options]
```

Where `<number>` is the number you want to use, and `[options]` specify how the
decimals are determined.

Here are some examples: 

**1.2d**

this will use the number 1.2, and gets the number of decimals from
the contract you're using. For example: 

`./eth-tool -f acc.key contract-send approve address 1.2d`

This will use the decimals of the contract you're calling approve on.
        
**1.2d.token**

this will call a function on the contract called "token", and then use
the number of decimals from the contract address that provides.

**1.2d:foodcoin**

this will load a contract address from the file called "foodcoin", and
use that contract's decimals. For example: 

`./eth-tool -f acc.key contract-send setTokenPrice foodcoin 1.2d:foodcoin`

**1.2d1**

this will use the contract address in the argument # 1, and get
decimals from that. For example: 

`./eth-tool -f acc.key contract-send setTokenPrice foodcoin 1.2d:1`

You can also use scientific notation. For example `1e18` would be 1 and 18 
decimals.

## Addresses

Any command that accepts an address can instead read it from a file. When
providing an address if the value doesn't match an address' format, it will
be treated as a file.

For example, if the file `foodcoin` has the following content:

`Address: 0xe8340fdfe79851e9e117b3033e147a654dbdb0ae`

Then, instead of doing this:

```
./bw token-balances 0xe8340fdfe79851e9e117b3033e147a654dbdb0ae
```

You can use the file like this:

```
./bw token-balances foodcoin
```

It even works with the [--address](./commands.md#address-address) option:

```
./bw --address foodcoin contract-call name
```
