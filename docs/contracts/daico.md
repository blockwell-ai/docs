---
title: Daico
---

# Daico

## Introduction

The Daico contract is a special kind of contract that enables you to make
payments from a pool of funds in batches, where each batch needs to be
approved by a group of voters you designate.

Only once the required number of votes have been cast the funds are
transferred.

The basic flow is as follows.

**1. Setup the contract**

- First, you deploy the Daico contract and set the type of asset it uses.
  This can be any ERC20 token.
- You set the number of votes needed for a payment to be made.
- You set the amount of tokens that will be sent as a payment.

Once deployed, you will be made the admin of the contract.

**2. Send the contract the funds**

You can send as many tokens to the contract as you'd like. Only you as the
admin can withdraw tokens from the contract, so they're as safe in the
contract as in your wallet.

**3. Designate voters**

You designate wallets as voters, and then the owners of those wallets can
cast votes on making payments.

**4. Create payment suggestion**

Then at any point you can create suggestions for a payment to be made.
When your voters have cast the necessary number of votes, a payment will
be made.

You can manually create suggestions when needed, or they can be automated
using a delegate account.

## Deployer

Here are QR Codes for deploying a Daico contract on both the Main Ethereum
Network and the Rinkeby Test Network 
([what are deployers?](./blockwell-contracts.md#what-are-deployers)).

After you deploy the Daico contract, you will receive an email with further
instructions.

<Qr code="y6sxqs">Deploy Daico (Main)</Qr>

<Qr code="811d1x">Deploy Daico (Rinkeby)</Qr>
