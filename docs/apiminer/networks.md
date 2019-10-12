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

### `libra`

API Miner sidechain using Geth Clique Proof of Authority. All gas prices are 0.

### `main`

The Main Ethereum network.

### `rinkeby`

The Rinkeby Ethereum testnet.
