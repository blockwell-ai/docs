---
title: Getting Started
autonav:
    order: -2
---

# Getting Started

ct, or chain-tool, is a command-line application that has many tools for reading, analyzing and interact with the
blockchain and related technologies.

ct can be installed and run on:

- Any Linux distribution through their native shell.
- macOS with [Terminal](https://support.apple.com/guide/terminal/welcome/mac) or another shell, both Intel and ARM (Apple M1/M2).
- Android phones using [Termux](https://termux.dev).

Windows may also work using [WSL](https://learn.microsoft.com/en-us/windows/wsl/about) or [Cygwin](http://www.cygwin.com/)
with bash, but is not actively tested.

## Installation

Most of the time you can simply run the installer script as follows:

```sh
curl -L https://chain-tool.blockwell.ai | sh
```

You can also just download the script from [https://chain-tool.blockwell.ai](https://chain-tool.blockwell.ai) and run it
manually.

Alternatively you can also just download one of the packages and extract it manually:
[macos-arm64](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-darwin-arm64.tar.gz) 
[macos-x64](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-darwin-x64.tar.gz) 
[linux-arm](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-linux-arm.tar.gz) 
[linux-arm64](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-linux-arm64.tar.gz) 
[linux-x64](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-linux-x64.tar.gz) 
[win32-x64](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-win32-x64.tar.gz) 
[win32-x86](https://cdn.blockwell.ai/ct/dckt2z3sjy7s7hm4wzpw/ct-win32-x86.tar.gz) 

Note that if you install manually, you'll also need to add the `bin/ct` to your PATH.

## Basic Usage

To see a list of global options and commands, you can run:

```sh
ct
```

### Running a command

To run a command, simply give the name of the command as the first argument. For
example, to use the [wei](commands.md#wei) command run:

```sh
ct wei
```

Most ct commands are part of a group, which is denoted by the command having a colon `:`.
Left of the colon is the group, and right is the actual command. For example:

```sh
ct eth:private-key
```

Will run the `private-key` command in the `eth` group.

### Getting help

All commands have a short help description and examples. You can view that information by using the
`--help` flag, for example:

```shell
ct eth:private-key --help
```

## Walkthrough

This walkthrough will go over a few basic commands to get you started with ct.

### Reading token information

Let's start with something simple: reading some token information from the
blockchain using the [`contract:read`](commands.md#contract-read) command.

Run the following command:

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read name
```

The output will look something like this:

```
info: Network: Mainnet
info: Loaded contract: Tether USD
Tether USD
```

The first few lines begin with `info:`, which means it's just informative
log messages. It's telling you the network/chain ct is currently configured to use,
and the smart contract it connected to.

The last line is the actual output of the command, which in this case
was `Tether USD`. That's the name of the token.

With that, we've read the name of the token from the blockchain!

::: tip
The command was a bit long because we needed to specify the network (aka. chain)
and the address of the smart contract. You can use [configuration files](./configuration.md)
to avoid having to type those one.
:::

We can read other information as well. All ERC20 tokens should have a
`symbol` in addition to a name. We can read that the same way:

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read symbol
```

The output is similar to before:

```
info: Network: Mainnet
info: Loaded contract: Tether USD
USDT
```

This time, it's giving us `USDT`, which is the symbol of the Food Coin token.

### Reading token balances

We've read basic info on the token using [`contract:read`](commands.md#contract-read).
Those are simple and easy, because there's only one "name" in a contract.

We'd also like to read token balances for wallets, which can be done using
the `balanceOf` function in ERC20 tokens. However, we need to tell the
command which wallet's balance we want to know.

This can be provided by giving additional arguments to 
[`contract:read`](commands.md#contract-read). In this case, I want to know
the balance of the wallet `0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503`. I can
do that by simply adding the address as an additional argument:

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read balanceOf 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503
```

Here's the output from this command:

```
info: Network: Mainnet
info: Loaded contract: Tether USD
1250000115495224
```

Okay, we have the balance, but there's an awful lot of zeroes. That's because
Ethereum doesn't support decimals, so instead it's just a really big number.
To get the value with decimals, you divide it by the

$${\frac{1250000115495224}{10^{d}}}$$

where `d` is the number of decimals in the token.

We can get the number of decimals from the ERC-20 token the same way as we got the name and symbol,
by reading the `decimals` function:

```sh
ct -n mainnet --address 0xdac17f958d2ee523a2206206994597c13d831ec7 contract:read decimals
```

This gives us `d = 6`.

ct has a utility to convert decimals:

```sh
ct from-wei 1250000115495224 -d 6
```

Output:

```
1250000115.495224
```

Note that this time it didn't show the `info: Network` line. That's because
the `from-wei` conversion doesn't require connecting to Ethereum.



## Next Up

- [List of all commands in ct](./commands.md).
- [Read about configuration files](./configuration.md).
