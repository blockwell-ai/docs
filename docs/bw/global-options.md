---
title: Global Options
---

# Global Options

## `--account <account file>`

> shortcut `-a <account file>`

Specifies an encrypted JSON store file to use as the Ethereum account to send
transactions with.

This option must always be accompanied by `--password`.


## `--password <password file>`

> shortcut `-p <password file>`

Specifies a text file with the password to the encrypted account specified with
`--account`.

It is recommended that this file be protected with restricted file permissions
and only created while you're using bw. Delete the file afterwards to help keep
the password safe.


## `--privatekey <key>`

> shortcut `-k <key>`

Use the given private key directly as the account to send transactions with.

**Note!** This is highly insecure, so it should only be used for testing and
low-value situations.


## `--keyfile <file>`

> shortcut `-f <file>`

Reads the account private key from the given file. The last line of the file
should be the private key. This private key is then used as the account to send
transactions with.

**Note!** This is highly insecure, so it should only be used for testing and
low-value situations.


## `--network <name>`

> shortcut `-n <name>`

> example `-n rinkeby`

Use the given network, or chain, instead of the default one in `config.yaml`.


## `--address <address>`

> example `--address 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae`

Sets the contract address to use with contract interactions, overriding the
default from `config.yaml`.


## `--quiet`

> shortcut `-q`

Suppresses all logging information from the output.


## `--plain`

Makes all output plain without special formatting, and without coloring.

Also sets [`--quiet`](#quiet).


## `--json`

Specifies that data output should be in JSON format. This does not work with
all commands.

Also sets [`--quiet`](#quiet).


## `--abi`

> example `--abi MyContract.abi`

Sets the ABI file to use for contract interactions, overriding the default from
`config.yaml`.

This can be an ABI file directly, or a [Truffle-style build file](./build-file.md)
that's a JSON object with the key `abi` containing the ABI.


## `--abiraw`

> example `--abiraw '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}]'`

Sets the ABI to be used directly from the given value.


## `--gasprice <price>`

> example `--gasprice 4`

Sets a specific gas price to be used instead of an automatic price.

The value given should be in gwei.


## `--gaslimit <limit>`

> example `--gaslimit 200000`

Sets a specific gas limit for transactions instead of an automatically calculated
one.


## `--nonce <nonce>`

> example `--nonce 132`  
> example `--nonce -0`  
> example `--nonce +2`

Sets the contract address to use with contract interactions, overriding the
default from `config.yaml`.

This can also be given with a preceding plus (+) or minus (-), in which case the
value will be added to or subtracted from the last nonce.

In other words, you can use `--nonce -0` to tell bw to use a nonce that's 0
less than the last nonce. In practice this means the new transaction will
overwrite your last one.

If you provide `--nonce +1`, that would set it to the automatically calculated
nonce, which is your last nonce plus 1.


## `--noconfirm`

If specified, bw will not wait for transactions to be included in a block. Instead,
after the transaction is sent and is pending on the node, bw will exit immediately.


## `--fromblock <block>`

> example `--fromblock 5000000`

Sets the lower-bound block when using commands that search the blockchain. For
example, if used with the [`transfers`](commands.html#transfers) command, it would
only find transfers from that block onwards.
