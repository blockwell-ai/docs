---
title: Build File Format
---

# Build File Format

bw uses the same format for built smart contracts as 
[Truffle](https://www.trufflesuite.com/truffle). However, you need not use Truffle
itself, but the format was chosen to avoid creating many different standards.

Here's what this format looks like:

```json
{
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        "..."
    ],
    "bytecode": "0x..."
}
```

It's simply a JSON file with an object that has at least these two keys:

- `abi` The ABI for the contract.
- `bytecode` The bytecode for deploying the contract.

With this file, you can both deploy and interact with contracts. It can be used
with the [`--abi`](./global-options.md#abi) option as well as with 
[`contract-deploy`](./commands.md#contract-deploy).

## Creating a build file

If you don't use Truffle, you can create a build file easily using the 
[jo tool](https://github.com/jpmens/jo) from `solc` output.

If you use solc with the following command:

```bash
solc --bin --abi -o build contracts/MyContract.sol
```

You can create the JSON build file using the following `jo` command:

```bash
jo abi:=build/MyContract.abi bytecode=0x$(cat build/MyContract.bin) > build/MyContract.json
```

Then the build file will be in `build/MyContract.json`.
