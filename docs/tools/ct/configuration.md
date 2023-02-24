---
title: Configuration
autonav:
    order: 2
---

# Configuration

While ct doesn't require it, you can use a configuration file to reduce the need to repeat flags in commands.

ct will look for a configuration file in the directory you run it in, and the file can be either one of the following:

- `.ctrc.yaml`
- `chain-tool.yaml`

You can use whichever suits your preference. If both files are present, `chain-tool.yaml` will take priority.

## Format

The configuration format is [YAML](https://en.wikipedia.org/wiki/YAML), for example:

```yaml
network: mainnet
address: 0xdac17f958d2ee523a2206206994597c13d831ec7
```

Each line in the file should be the name of a flag (with underscores `_` instead of dashes `-`), followed by a colon
`:`, and then the value. In the above example, the `--network` flag will get "mainnet", and the `--address` flag
will get the `0xdac...` address.

If you give the command a value with a flag, it will always take priority over the configuration file's value.

## The config command

To make it easier to create configuration files, ct comes with the [`config`](./commands.md#config) command that
automatically creates the file.

If you run the command without any flags:

```shell
ct config
```

It will write all the default configuration options into the file, and you can then make changes as needed.

If you give the command some flags:

```shell
ct config --address 0xdac17f958d2ee523a2206206994597c13d831ec7 -n mainnet
```

The file will only have those values, like so:

```yaml
# Ethereum network to use, or chain ID.
network: mainnet

# Contract address to use.
address: 0xdac17f958d2ee523a2206206994597c13d831ec7
```

## Workspaces

Because ct always uses the configuration file in the directory you're in, you can use directories as workspaces to
make it easy to switch between different tasks or projects.

An example should make it clearer. Let's say you have the following directories:

```
├ usdc/
│ └── chain-tool.yaml
└ tether/
  └── chain-tool.yaml
```

You can create them with the following set of commands:

```
mkdir usdc
cd usdc
ct config --address 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 -n mainnet
cd ..
mkdir tether
cd tether
ct config --address 0xdac17f958d2ee523a2206206994597c13d831ec7 -n mainnet
cd ..
```

Then when you are in the `usdc` directory, commands will default to using the USDC token:

```sh
 $ ct contract:read name
info: Using cache directory dump/2023-02-24
info: Network: Mainnet
info: Loaded contract: USDC
USD Coin
```

And changing to the `tether` directory will automatically use Tether:

```sh
 $ ct contract:read name
info: Using cache directory dump/2023-02-24
info: Network: Mainnet
info: Loaded contract: Tether USD
Tether USD
```
