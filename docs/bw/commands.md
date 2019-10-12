---
title: Commands
sidebarDepth: 2
---

# Commands

## Transaction commands

These are commands that perform a transaction on the blockchain.

With all of these commands, you must provide exactly one of:

- [`--account`](global-options.md#account-account-file)
- [`--privatekey`](global-options.md#privatekey-key)
- [`--keyfile`](global-options.md#keyfile-file)

### send

Sends ERC-20 tokens from the configured account to the given address.

Arguments:

- `recipient` Address of the recipient
- `amount` Token amount to send, in whole units

Example:

```
./eth-tool -f keyfile send 0x632777aeb73f955a660817d5f1ab1a36365485aa 1.2
```
