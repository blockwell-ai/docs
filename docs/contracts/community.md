---
title: Community Token
sidebarDepth: 2
autonav:
  group: ERC-20 Tokens
---

# Community Token

<Deployer code="sqmbcd">Community Token</Deployer>

<Dapp url="https://app.blockwell.ai/suggestions">Voting</Dapp>

## Introduction

A Community Token is similar to [Prime](./prime.md) and has mostly the same features.

In addition, Community Token has more advanced [Suggestions](./suggestions.md) and voting.

## Allocated Voting

Community Tokens can use Allocated Votes with [Suggestions](./suggestions.md).

All token holders receive a certain number of votes depending on how many 
tokens they hold. All holders receive at least 1 vote, according to the following table:

| Tokens | Votes |
| ------ | ----- |
| 1,000 or less | 1 | 
| 1,001 to 10,000 | 2 |
| 10,001 to 100,000 | 3 |
| 100,001 to 1,000,000 | 4 |
| 1,000,001 to 10,000,000 | 5 |

...and so on. For the specifics on how this is calculated, as well as how you can adjust
it, see [Vote Calculation](#vote-calculation).

You can vote multiple times on one suggestion, or spread your votes on different suggestions.

All token holder votes will refresh once a week. In other words, even if you spend all of 
your votes, you will be given more votes next week. You can read more about how this
works in [Vote Refresh](#vote-refresh).

## Proposals

Community Tokens have an additional type of suggestions called a Proposal.

Proposals can have different meanings for different tokens, but they typically
represent suggestions that the community has approved of, and will receive added
attention.

### Creating Proposals

Proposals cannot be created directly. Instead, once a suggestion reaches a certain number 
of votes, it will be promoted into a Proposal automatically. Proposals have a second 
round of voting  that works differently from voting on suggestions.

Voting on a Proposal can only be done once per week by everyone, and you can never vote 
twice on the same Proposal. However, instead of your vote counting for a single vote, 
the Proposal will get votes equal to your total token balance. For example, if you 
have 200,000 tokens, when you vote for a Proposal, it will receive 200,000 votes.

The number of votes required on a suggestion for it to be promoted into a Proposal is
configurable.

## Vote Calculation

The default configuration for calculating the number of votes token holders receive
tries to keep voting fairly equal, but still give an advantage to those who have
a bigger stake in the token. This is achieved by using a 
[logarithm](https://en.wikipedia.org/wiki/Logarithm). In practice, that just means
that to have more votes, you need to have exponentially more tokens.

There are two variables that can be set to configure how many votes token holders
receive:

1. `allocationLogarithm` is a logarithm *base*. Default is `10`.
2. `allocationStart` specifies the scale. Default is `100` tokens.

The number of votes a token holder receives is calculated using a simple formula:

$$votes = \log_{X}(\frac{balance}{S})$$

where $X$ is `allocationLogarithm` and $S$ is `allicationStart`. $votes$ is then
rounded up for the final number.

The default value of `allocationLogarithm` being `10` means that to get an additional
vote, you need 10 times more tokens. That is, if you get 2 votes at 1,000 tokens,
you'll need 10,000 tokens to get 3 votes.

The `allocationStart` value determines the base value of how many tokens is
considered 1 vote. In other words, if you have 10 times `allocationStart` in tokens,
you'll receive 2 votes, and then 10 times that will give you 3 votes, and so on.

### Special Values

The `allocationLogarithm` can have two special values that normally aren't allowed
for logarithms:

- `0` will turn off the logarithm and everyone receives a single vote regardless
  of balance.
- `1` will give everyone as many votes as they have tokens, divided by
  `allocationStart`.

### A Note On Approximation

Because Ethereum doesn't support floating point or decimal math, the logarithm is
an approximation using whole numbers, and the result is rounded up.

For example, using the default values of `allocationLogarithm` and `allocationStart`,
a real logarithm for a token balance of 1001 is:

$$\log_{10}(\frac{1001}{100}) = 1.000434\dots$$

The algorithm approximates this and rounds up, so the result is $2$. This means
that as soon as you have more than 1000 tokens, you receive a second vote.

## Vote Refresh

All token holders are given new votes after a certain amount of time has passed.
By default that time is 7 days, so new votes will be given once a week.

The number of votes will reset to its maximum value for each token holder's balance.
For example, if someone uses 2 out of their 6 votes, they will go back to having
6 votes available, rather than the votes accruing over time. This encourages
people to use the votes rather than save them up.

The period of time for votes to refresh is configurable, it can be any amount
of time and is specified as number of seconds. The default is `604800`, which
is the number of seconds in a week (excepting leap seconds).

Lastly, the vote refresh doesn't get applied immediately after the time period
has passed. The new votes will be available right after the period, but on the
blockchain it won't be applied until the next time someone votes. What that means
in practice is that after the 7 days has passed, the countdown to the next refresh
won't start until someone votes. 

For example, let's say the time period is one week, 
and the next refresh happens on Monday at 10 in the morning. The first vote then
happens at 11 in the morning, and that's where the next time period will be
counted from. That means next week the new votes will be available at 11 in
the morning.
