---
title: Content Encryption
autonav:
  order: 2
---

# Content Encryption

## Introduction

A lot of content in [Core](./README.md) is sensitive in nature. Without
security, tasks and work done could be used by competitors to their
advantage. Task descriptions or discussion could have valuable intellectual
property.

[Blockwell Core](./README.md) uses Blockwell's **AutoCrypt** system to protect
all content posted to the blockchain.

::: tip
Using encryption is entirely optional, you can have a Core board with fully
public information.
:::

## How It Works

Each peice of content is **fully encrypted** before being submitted on-chain.
Blockwell's API **authenticates and verifies** all clients before giving access
to the decrypted content.

In order to be given access to content, a user must be **holding the corresponding
token** for the [Core](./README.md) board they're viewing. This means that
the **token acts as an access-control mechanism** in addition to being used
for governance.

Verification is done in two steps:

1. The client first has to prove they control a specific Ethereum account.
   If they're using Blockwell Wallet, the server can verify their control
   internally. If they're using an external wallet, verification can be
   done by signing.
2. The API checks that the verified Ethereum account has the necessary tokens
   directly on the blockchain.
   
Once fully verified, access is granted.

## Technical Details

Encryption is done with `AES-256` before being submitted
on-chain. `AES-256` is a high-performance symmetric-key encryption algorithm
with no known practical attacks, and the 256-bit variant is the strongest.

Each piece of content receives its own encryption key through a key-derivation
function (KDF), which combines a large number of secure keys with content
metadata to derive unique keys for a practically limitless amount of content.

Because each piece of content is encrypted with a unique key, gaining access
to one does not compromise any other content.
