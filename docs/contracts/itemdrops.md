---
title: Item Drops / Lotto
sidebarDepth: 2
---

# Item Drops / Lotto

<Deployer code="fg6vws">Lotto Contract</Deployer>

## Introduction

Item Drops, also known as Lotto, is a contract that lets users play games of
chance to win tokens.

It can provide the basis for any game where the result is determined by a single
random result. Possibilities include:

- Scratch and wins
- Slot machines or fruit machines
- Lottery, Keno, etc.

In addition to just winning coins, users can win "items" in the form of other tokens.
For example, in addition to just a lottery, there could be a 1% chance of a player
winning a voucher for a free pizza.

The Item Drops and Lotto are independent, a contract can use only one of them, or
both at the same time.

## Play

You can try playing a sample Lotto for Food Coins. All Blockwell Wallets receive
Food Coins at signup, so all Blockwell users can play it for free:

<Qr code="4beui3">Play Food Coin Lotto</Qr>

You can see how the Food Coin Lotto is configured on the 
[Lotto hybrid app](https://qr.blockwell.ai/lotto?contract=0x52683A6789b294Da993FD48636707047cc104485&net=4).

## Configuration

There are several configuration options that the contract has. You can use the
Lotto dapp to view and make changes to configuration:

https://qr.blockwell.ai/lotto

## Price For Playing

Playing can be made free, or cost any amount of any ERC-20 token. The token could
be an already established stablecoin, or a token specifically made for playing.

In addition, the contract can be configured to give players free plays before
they need to pay.

## Lotto, aka. Win Rates

With Lotto, users have a chance to win the same token they paid with. The contract
is configured with a list of win rates and amounts, and it then uses a pseudorandom
number to determine if the user wins, and how much.

Here's a very simple example:

| Chance To Win | Win Amount |
|---------------|------------|
|           20% |    1 token |
|           10% |   2 tokens |
|          0.5% | 100 tokens |

That would mean the player has a 20% chance to win 1 token, a 10% chance to win
2 tokens, a 0.1% chance to win 100 tokens and a 69.5% chance to not win anything.

### Average Win and House Edge

Based on the Win Rates and the Price to play, the profitability of the contract
can be calculated. The [Lotto dapp](https://qr.blockwell.ai/lotto) calculates
these automatically, but here's how they work.

#### Average Win

Someone playing once could win the 100 tokens right away, which means the contract
would lose tokens. Over time those even out, and an Average Win amount is established.
This is how many tokens users are likely to win on average over all their plays.

For the example Win Rates above, that ends up being 0.9 tokens. It can be
calculated by multiplying each win amount with its chance to win, and adding those
up:

$$20\% \times 1 + 10\% \times 2 + 0.5\% \times 100 = 0.9$$

#### House Edge

House Edge, sometimes called rake or vigorish, is a measure of how much of an
advantage the owner of the game has over time.

Let's say in the above example players pay 1 token to play the game. We know that
on average they will receive 0.9 tokens per play, so that means the contract makes
a profit of 0.1 tokens per play over time.

House Edge is how big of a portion of the player's payment is that profit. In
the example it's 0.1 out of 1 token, which makes it 10%.

If the win rates are set so that the contract actually loses money over time,
then the House Edge is negative.

## Item Drops

Item Drops give users a chance to win tokens other than the one the paid with.
In fact, there can be any number of different tokens for users to win, each
with a different chance to win.

The tokens can be tokens that have monetary value, or they can be used as
vouchers to be exchanged for goods or services. For example, the contract
might have the following item drops:

| Chance To Win | Token | Exchanged For |
| ------------- | ----- | ------------- |
|           10% | Sunglass Token | A pair of sunglasses |
|            5% | Hat Token | A baseball cap |
|          0.1% | Celebrity Token | A meeting with a celebrity partner |

The items don't have to be physical goods either, they could be digital
services, or just regular tokens.
