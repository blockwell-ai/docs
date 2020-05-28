---
title: Blockwell Contracts
---

# Blockwell Contracts

## Contracts

Blockwell has written many different types of contracts with novel features.
Here's a quick overview of some of them.

### ERC-20 Tokens

[**Prime**](./prime.md)  
Multi-functional ERC-20 token with support for voting, locking, cross-chain swaps, 
freezing, Blockwell Quill and more.

[**Community**](./community.md)  
An ERC-20 token with advanced voting functionality.

### ERC-721 Tokens

[**Forum**](./forum.md)  
A Non-Fungible Token with Community Token's advanced voting.

### Governance

[**Daico**](./daico.md)  
The Daico contract lets you govern funds and their use.

[**Community**](./community.md)  
Community Token's advanced [Suggestions](./suggestions.md) and 
[Proposals](./community.md#proposals) allow for group governance.


## What are Deployers?

Most Blockwell contracts have a corresponding special Deployer contract that
allows anyone to get their own copy of the contract without having to learn
about all the complexities of building and deploying smart contracts.

A Deployer is just another smart contract, but all it does is create other
smart contracts on the blockchain. It has all the same guarantees as a 
regular smart contract, so you can be sure the same contract is created
every time.

You use a Deployer by calling its `deploy` function and provide the configuration
for the contract you want to deploy. After deployment, you will be made the
owner and admin of the new contract.

These Docs include [Blockwell Wallet Codes](../qr) to make using Deployers easy.
