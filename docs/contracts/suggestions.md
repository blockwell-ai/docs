---
title: Suggestions
sidebarDepth: 2
---

# Suggestions

## Suggestions and Voting

This feature allows adding suggestions to the contract and users voting on them.

Suggestions are simply a short text describing the suggestion, and can be
anything you want your users to vote on.

## Blockwell Roar

Blockwell Roar is a contract that lets the community suggest and vote for new
features or other improvements for Blockwell.

Use the following QR Code to create a new suggestion for Blockwell Roar:

<Qr code="i5e0b9">Blockwell Roar Create Suggestion</Qr>

This one is for voting on Blockwell Roar suggestions:

<Qr code="0mxqal">Blockwell Roar Vote</Qr>

You can also use the Web Suggestion Viewer to see all existing suggestions
in Blockwell Roar:

> [Blockwell Roar Suggestion Viewer](https://qr.blockwell.ai/suggestions?contract=0xE595564689D6E0206b095915C219a8c7a130cF7B&net=rinkeby)

## Viewing Suggestions

There are three ways to view suggestions and their votes on a contract:

1. Read the data directly from the contract on the blockchain.
2. Use a [QR Code](../qr) for voting on a contract. The app will display
   all suggestions you can vote on.
3. Use the [Web Suggestion Viewer](https://qr.blockwell.ai/suggestions).

## Tagging

Suggestions can also include a tag that lets you organize suggestions. Simply
add the name of a tag and a colon at the beginning of the suggestion, like this:

```
DESIGN: Plan a better UI for creating suggestions
```

QR Codes and the [Web Suggestion Viewer](https://qr.blockwell.ai/suggestions)
will understand the tag and display it accordingly.

## Casting votes

There are two functions for casting votes:

- `vote(uint256 suggestionId, string comment)` casts one vote on the suggestion
  with the given ID. The comment is optional and can be left blank.
- `multiVote(uint256 suggestionId, uint256 votes, string comment)` casts multiple
  votes on the issue with the given ID. This can only be used if the contract is
  configured to allow multiple votes (see [Configuration](#configuration)).

## Configuration

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

### Unlimited voting with each vote costing 1 token

You would call:

- `setOneVotePerAccount(false)` to allow multiple votes to be cast.
- `setVoteCost(1000000000000000000)` to set the cost of a vote to one token 
  (18 decimals).

### Anyone can create suggestions and vote once without any tokens

You would call:

- `setRequireBalanceForVote(false)` to allow voting without having tokens.
- `setSuggestionsRestricted(false)` to allow anyone to create suggestions.
- `setRequireBalanceForCreateSuggestion(false)` to allow anyone to create
  suggestions without having tokens.

Now anyone can create suggestions and vote once per suggestion without
needing to have a balance of tokens.
