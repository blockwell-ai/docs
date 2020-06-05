---
title: Configuration
autonav:
    order: 2
---

# Configuration

bw holds its primary configuration in `config.yaml` in the same directory. See below
for a sample version of the config file.

Most options in the config file can be overridden with command line flags.

```yaml
# Name of the network to connect to by default. You can configure 
# the specific nodes to use below.
network: rinkeby

# Nodes and their connection URL for each network
nodes:
  - network: rinkeby
    url: https://rinkeby.apiminer.com/http/****

  - network: mainnet
    url: https://mainnet.infura.io/v3/***

  - network: caelum
    url: https://caelum.apiminer.com:8545


# Default ABI file for the contract
contract_abi_file: lib/erc20.abi

# Default address of the contract. This must be in quotes, 
# otherwise it's interpreted as a hex number
contract_address: "0xE595564689D6E0206b095915C219a8c7a130cF7B"

# The maximum gas limit to allow for automated gas limits
max_gas_limit: 6900000

# Logging level. Set to debug to see all logging, or info 
# to just see important info
logging_level: info

# Limit search from this block number. Making this higher will 
# speed up most data queries, if you don't need to search from the 
# beginning of the blockchain
from_block: 0
```
