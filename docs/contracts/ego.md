---
title: Ego Coin
sidebarDepth: 2
---

# Ego Coin

Ego Coin is an ERC-20 compatible token for tracking points on accounts.
It does not have a supply, instead all tokens are minted on demand.

Because Ego Coin is intended for tracking whole points, it has **no decimals**.

With the exception of [Minter](#minter), the features below are all identical
to [Prime Token](./prime.md).

## Features

### User Roles

There are five main user roles that can be assigned: Admin, Attorney, Bundler,
Minter, and Whitelist.

#### Admin

An admin can do most things on the token, with exceptions only with regards to
pausing. Specifically, an admin cannot unpause the token if an attorney has
paused it, and most features cannot be used when the token is paused. For full
details see Pause below.

Admins can be added by other Admins and Attorneys.

#### Attorney

An Attorney has basically all the same powers as an Admin, except with regards
to pausing. See Pause below for details.

Attorneys can be added by Admins and other Attorneys.

#### Bundler

A Bundler is allowed to use the `multiTransfer` and `multiTransferFrom`
functions, which lets them distribute tokens.

Bundlers can be added by Admins and Attorneys.

#### Minter

Minters are allowed to mint tokens to an account of their choosing. 

Minters can have unlimited minting powers, or an Admin can give someone the
power to mint with a set limit of tokens. For example, they could be allowed
to mint 1,000 tokens, and once they've minted a total of 1,000 tokens they
lose the ability to mint.

#### Whitelist

A Whitelisted user is allowed to transfer tokens even if the token is locked.
They have no further powers.

Users can be Whitelisted by Admins and Attorneys.

### Bw Admin

There is a special role for a Blockwell Admin account. The only powers the BW
Admin has is they can reinstate Admins and Attorneys in case of emergencies
where control of the token has been lost due to a security breach or abuse of
power. This power circumvents Pause,  locks and other controls.

This account will never be used without the consent of the business the token
belongs to.

### Token Lock

The token has a lock mechanism that prevents normal users from using their
tokens.

The lock is time-based, when the lock expires the token is opened up for general
use. The initial time is set when the token is deployed, but it can also be
changed by an Admin or an Attorney.

The following functionality is disabled when the token is locked:

- `transfer` Transfer of tokens `approve` Approving wallets to transfer your
- tokens `transferFrom` Transferring from approved wallets `createBrandToken` Is
- disabled indirectly because transfer is required for it

There are some exceptions as well:

- An Admin, Attorney, or Whitelisted user is not affected by the lock Multi
- transfer functionality circumvents locks, but is only usable by Bundlers

### Freeze

Individual accounts can be frozen, which prevents them from interacting with the
token. Specifically:

- Cannot send or receive tokens by any means, not even multi transfer Cannot
- approve wallets for tokens

Admins and Attorneys can freeze and unfreeze accounts. In addition to using it
on a single account, `multiFreeze` and `multiUnfreeze` functions exist for
efficiency.

### Pause

The whole token can be paused to prevent almost all activity. Pausing can be
done by Admins and Attorneys.

Specifically:

- Prevents all token transfers, including multi transfers Prevents changing
- token approvals Prevents Admins and Attorneys from being added and removed If
- the Pause was initiated by an Attorney, an Admin cannot unpause

A few things can still be done:

- Freezing and unfreezing Adding to and removing from Whitelist Adding and
- removing Bundlers Modifying profile and shop data

### Multi Transfer

The token has two functions for making multiple transfers at the same time:
`multiTransfer` and `multiTransferFrom`.

This functionality makes it much faster to distribute tokens, and it saves
almost 50% on gas costs compared to individual transfers when sending to more
than 5 or so addresses.

Only Bundlers can use these two functions, and both functions ignore the Token
Lock. This means it can be used to distribute tokens while it's still locked,
but only users added as Bundlers can do it.

`multiTransfer` transfers tokens directly from the Bundler's token balance, it
is equivalent to using a regular transfer multiple times.

`multiTransferFrom` transfers tokens from another wallet that the Bundler has
approval for. The Bundler doesn't have the tokens, they're essentially just
directing the tokens to their destination. This is equivalent to using
`transferFrom` multiple times.

With both of these functions, special logic is used if any of the recipients are
currently Frozen. Since frozen accounts cannot receive tokens, they are skipped.
When this skipping happens, the contract emits an event called
`MultiTransferPrevented`, so that you can know when it happens. The event
contains the sender, recipient, and the amount of tokens.

### Suggestions and Voting

Prime includes the [Suggestions feature](./suggestions.md).

### Cross-chain swapping

Prime has functions to facilitate swapping tokens across Ethereum chains. The
swap relies on an external system to cross the chains, which Blockwell can
provide.

A cross-chain swap is initiated using the `swapToChain` function that takes
three arguments:

1. `chain` The name of the chain to swap to (eg. "rinkeby").
2. `to` The wallet address on the other chain to swap to.
3. `value` The amount of tokens to swap.

Prime then does the following:

- First, it generates a unique ID for the swap so that it can be tracked across
  chains for auditing.
- Takes hold of the tokens the user wants to swap.
- Emits a `SwapToChain` event with the swap's details and the generated ID.

Then, the external system picks up the `SwapToChain` event and calls the 
equivalent token on the other chain with the function `swapFromChain`.

The Prime contract on the other chain then does the following:

- Transfers the specified wallet tokens from its held supply.
- Emits a `SwapFromChain` event with the swap details and the matching ID
  generated by the original contract.
  
#### Cross-chain swap auditability

At any point anyone can check to see if all cross-chain swaps were performed
correctly by reading the `SwapToChain` events from one chain, and `SwapFromChain`
events from the other. They should all have matching IDs, amounts and addresses.
