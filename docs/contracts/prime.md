---
title: Prime
sidebarDepth: 2
---

# Prime

## Introduction

Blockwell Prime is a multi-functional ERC20 compatible token. It has many
advanced features, but Prime can also be used as just a basic token. You can
always take advantage of the features later on.


## Deployer

Here are QR Codes for deploying a Prime Token on both the Main Ethereum
Network and the Rinkeby Test Network 
([what are deployers?](./blockwell-contracts.md#what-are-deployers)).

When you deploy a Prime contract using either QR Code, the main supply will
be given to the wallet you used to deploy the token.

<Qr code="y6sxqs">Deploy Prime Token (Main)</Qr>

<Qr code="ev2r9u">Deploy Prime Token (Rinkeby)</Qr>

## Features

### ERC-20

The token is fully ERC-20 compliant.

#### Approve and Transfer From

One aspect of ERC-20 that is not well-known is approvals and transfer from, so
here is a short explanation.

Approve lets you give another user permission to use your tokens from your
wallet. You give a specific limit on how much they can use, and then they can
transfer tokens from your wallet to any wallet. This special transfer is called
Transfer From.

For example, I could approve John to spend 100 of my tokens. John can then use
Transfer From to send up to 100 tokens from my wallet directly to another wallet
of his choosing.

Every time Transfer From is used, the amount is deducted from the total
approval. For example, if John transfers 40 tokens from my wallet to Lucy, he
could still send another 60 tokens to a different wallet.

Note that John never had any tokens himself, he only acted as a kind of delegate
on where the tokens should go.

### User Roles

There are four main user roles that can be assigned: Admin, Attorney, Bundler,
and Whitelist.

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

This feature allows adding suggestions to the contract and users voting on them.

Suggestions are simply a short text describing the suggestion, and can be
anything you want your users to vote on.

#### Casting votes

There are two functions for casting votes:

- `vote(uint256 suggestionId, string comment)` casts one vote on the suggestion
  with the given ID. The comment is optional and can be left blank.
- `multiVote(uint256 suggestionId, uint256 votes, string comment)` casts multiple
  votes on the issue with the given ID. This can only be used if the contract is
  configured to allow multiple votes (see [Configuration](#configuration)).

#### Configuration

The voting system can be configured to behave in different ways:

- `setSuggestionsRestricted(bool restricted)` If this is set to true, only
  users with the Delegate role can create suggestions. Defaults to true.
- `setRequireBalanceForVote(bool required)` If this is set to true, users must
  have a non-zero balance of tokens to cast votes. Defaults to true.
- `setRequireBalanceForCreateSuggestion(bool required)` If suggestions are NOT
  restricted to Delegates, and this is set to true, users must have a non-zero
  balance of tokens to create suggestions. Defaults to true.
- `setVoteCost(uint256 cost)` If this is set to non-zero, a payment of this
  amount will be deducted from users per vote they cast. If they don't have
  enough tokens to pay, the vote will fail. Defaults to 0.
- `setOneVotePerAccount(bool oneVote)` If this is set to true, users can only
  vote once per suggestion. Defaults to true.
  
Here are a couple of example configurations.

##### Unlimited voting with each vote costing 1 token

You would call:

- `setOneVotePerAccount(false)` to allow multiple votes to be cast.
- `setVoteCost(1000000000000000000)` to set the cost of a vote to one token 
  (18 decimals).

##### Anyone can create suggestions and vote once without any tokens

You would call:

- `setRequireBalanceForVote(false)` to allow voting without having tokens.
- `setSuggestionsRestricted(false)` to allow anyone to create suggestions.
- `setRequireBalanceForCreateSuggestion(false)` to allow anyone to create
  suggestions without having tokens.

Now anyone can create suggestions and vote once per suggestion without
needing to have a balance of tokens.

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

## Token Distribution

Token distribution happens using the Multi Transfer functionality as described
above.

There are two basic scenarios for distribution:

### Primary bundler that needs to distribute tokens

This is when a bundler is working directly with you and they haven't received
any tokens.

In this case, two things need to happen to set them up for distribution:

1. Their account needs to be added as a Bundler using `addBundler`. 
2. Their account needs to be approved to spend tokens equal to the amount of their
distribution. This is done using `approve`.

Then bundler can then use `multiTransferFrom` to distribute the tokens
directly from your supply to their list of recipients.

The major benefit to this is because the tokens aren't sent to the  bundler,
an incorrect wallet address or some other issue won't lead to the tokens being
lost.

It also reduces the likelihood of the tokens being stolen in case of a hack on
the bundler's wallet.

### Bundler who already has tokens

The above process can't be used when the user already has tokens for
distribution. This is the case with sub-bundlers who received their tokens
from a bundler's distribution. This also applies when you as an admin are
distributing tokens directly from the main supply.

In this case, the only thing needed to set up for distribution is the account
being added as a Bundler.

The bundler can then use `multiTransfer` to distribute the tokens.
