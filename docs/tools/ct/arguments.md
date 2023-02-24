---
title: Argument Format
autonav:
    order: 3
---

# Argument Format

There are a few special ways to provide arguments to ct commands.

## Decimals

A lot of numbers on Ethereum use a large number of decimals which need to be
converted. Most tokens and ETH itself have 18 decimals for everyday use, but
the blockchain itself doesn't know about decimals.

For example, when you say `1 ETH`, the blockchain thinks `1000000000000000000`,
in other words 1 followed by 18 zeroes for 18 decimals. If you tell the blockchain
`1` for ETH, it will think you meant `0.000000000000000001 ETH`.

There is a special decimal format you can use to make providing numbers with decimals
easier:

```
<number>e[decimals]
```

Where `<number>` is the number you want to use, and `[decimals]` is the decimal
count. This is commonly known as "scientific notation" for large numbers, and is
often used by digital calculators.

For example `1e18` would be 1 with 18 decimals.

## Addresses

Any command that accepts an address can instead read it from a file. When
providing an address if the value doesn't match an address' format, it will
be treated as a file.

For example, if the file `binance` has the following content:

`Address: 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503`

Then, instead of doing this:

```
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read balanceOf 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503
```

You can use the file like this:

```
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read balanceOf binance
```

It even works with the [--address](./flags.md#address) option, so if you place the address of USDT
in the file `usdt`, you can do this:

```
ct -n mainnet --address usdt contract:read balanceOf binance
```
