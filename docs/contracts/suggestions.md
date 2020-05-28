---
title: Suggestions
sidebarDepth: 2
autonav:
  group: Contract Features
---

# Suggestions

## Suggestions

This feature allows adding suggestions to the contract and users voting on them.

Suggestions are short pieces of text that token holders can create, as well as 
vote on. All data on suggestions are stored on the blockchain in a transparent manner.

A suggestion can be a communication or some action you’d like to bring 
attention to, and have users vote on which ones the community cares the most about.

There is also an advanced form of suggestions in [Community Token](./community.md)
with more features.

## Voting

By default, each token holder can keep voting for as many different suggestions
as they want, but only once per each suggestion.

For different voting configurations, see [Configuration](#configuration). With
Community Tokens, you can also configure [advanced Allocated Votes](community.md).

## Viewing Suggestions

There are three ways to view suggestions and their votes on a contract:

1. Read the data directly from the contract on the blockchain.
2. Use the [Web Suggestion Viewer](https://qr.blockwell.ai/suggestions).
3. Use the Android Suggestion Viewer in the top-right menu of the Android app.

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
