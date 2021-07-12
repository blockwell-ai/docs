---
title: Ethereum Chains
---

# Ethereum Chains

API Miner can interact with any arbitrary Ethereum network as long as a connection
to it has been made. This means that sometimes a request needs to specify which
network it's operating on.

When a network needs to be specified, it's typically specified using the system
name for that network, although chain ID is also accepted. For example, to use the
main Ethereum network, you'd specify either `"main"` or `1` - the two are equivalent.

## Current networks
The following networks are currently known to API Miner.

### `main`

The Main Ethereum network.

### `rinkeby`

The Rinkeby Ethereum testnet.

### `leprichain`

[Lepricon's](https://lepricon.io) Leprichain sidechain.

### `firechain`

A gas-free sidechain managed by Blockwell.

### `ropsten`

The Ropsten test network.

### `kovan`

The Kovan test network.

### `goerli`

The Görli test network.

