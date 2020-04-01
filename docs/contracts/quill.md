---
title: Quill
sidebarDepth: 2
---

# Quill

Blockwell Quill is a system for storing data and configuration on the blockchain without
needing to code them in the contract. They can then be used by other contracts
on-chain, or by processes off-chain.

Fundamentally Quill is like a [key-value store](https://en.wikipedia.org/wiki/Key-value_database)
where the key is an Ethereum address, and the value is text.

## Key

A key is what you use to refer to a specific piece of data. The key itself is also just
data, it could be a number, a name, an address, or anything else.

Picture an apartment complex with 100 apartments. Somehow you need to know which apartment
to go to. Fortunately each apartment has a number attached to it. If you go to apartment
5 one day, and then go to apartment 5 again the next day, you'll arrive at the same
apartment. This apartment number is the "key" to finding the right apartment.

With Quill, the key is an Ethereum address. Using the same address gives you the same
data. You can use the addresses as is and store data on other contracts or wallets
based on their address.

You're not limited to using an Ethereum address as the key. Because the addresses are
long and uniformly distributed, it is safe to use a [hash function](https://en.wikipedia.org/wiki/Hash_function)
to determine the actual key. In practical terms that means you can turn anything into
an Ethereum address and use that as the key.

For example, the text "Apartment 5" turns into the following Ethereum address:

```
0x7350c6370a166335cbee49fb9df9f682aba57d86
```

You could then use "Apartment 5" as the key, as long as you run the hash function on
it first. You can try it yourself here: 
[https://emn178.github.io/online-tools/keccak_256.html](https://emn178.github.io/online-tools/keccak_256.html) - 
take the last 40 characters from the output and add 0x in front of that.

::: warning
These Ethereum addresses look like wallets, but they should NOT be used as such.
Any Ether or tokens you send to these addresses will be lost. 
:::

::: detail
Ethereum itself uses the keccak-256 hash function for a lot its hashing needs, but
you can use other hash functions as well. To turn any sufficiently long hash into
an Ethereum address, you just need to take 20 bytes from it and convert it into
hex notation.
:::

## Value

The value of the data is stored as a `string` on-chain, which means it can be text
of any length. With text, you can represent any type of data using simple conversions.
For example, the number `5` can just as easily be the text `"5"`.

Keep in mind that more data takes up more space, which increases gas costs. This is
mostly important if your contract is on the Main Ethereum Network, but it does also
mean there's a limit to how long the text is. You will likely start having problems
if the data exceeds 10,000 characters.

The value can also use our [Data Strings](./data-strings.md) system.

## Quill Types

There are two main types of Quill: basic Quill and myQuill.

### Basic Quill

The basic version of Quill can only be changed by contract administrators. The
admin chooses the key and the value to set, and has no restrictions. It can also
be used by automated systems that have been given access to it. 

### myQuill

myQuill is a version of Quill that any wallet can configure for themselves. The 
key is always the sender's wallet address, so you know only the owner of the
wallet is able to change it.

This can be used for allowing users to make configuration changes themselves,
or submit information to the blockchain. Since you know only the owner of the
wallet is able to change the data, it acts as a form of authentication.
