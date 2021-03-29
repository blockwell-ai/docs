---
title: Random Numbers
autonav:
  order: 2
---

# Random Numbers

In order to determine winners, the Lotto contract uses a pseudo-random number generator based on three
variables:

1. Block time
2. Block miner's address
3. A nonce stored in the contract that increases with every random number

These three values are then used to calculate a hash, which is converted to a number.

The number is then divided so that the remainder (aka. modulo) is the random number we want.

This produces a random number that's evenly distributed, meaning an equal percentage change always has
the same chance of being picked. Or restated, there is no significant bias in the result, and the distribution of
numbers is uniform.

This method also makes the random number difficult to predict or alter, only a major Ethereum miner
would be able to affect the outcome.

## Details

Expressed as a formula:

$$R(n) = \text{KEC}(\text{RLP}(T_\text{block} + A_m + N))\mod n$$

Where:

- $n$ is the maximum desired value of the random number
- $\text{KEC}$ is the Keccak-256 hash function
- $\text{RLP}$ is the encoding used by Ethereum to prepare the data for hashing
- $T_\text{block}$ is the block time, aka. `block.timestamp`
- $A_m$ is the address of the miner, aka. `block.coinbase`
- $N$ is the random nonce in the contract

Each component in the formula serves a specific purpose.

The $T_\text{block}$ **block time** ties a specific random result into time. It ensures that
even if the other data is all the same, a different block can't have the same result. It does
also marginally increase the size of the result space since if you're not a miner, it's
difficult to predict the exact block time.

The $A_m$ **miner's address** increases the potential result space. It is very difficult to predict
without being one of the top Ethereum miners.

The $N$ **random nonce** is a number that increases with every generated random number. It ensures
that two transactions in the same block get a different random number.

The $\text{KEC}$ **hash function** turns the input data with poor distribution into a value
with uniform distribution. In addition, because the hash function is one-way, you can't
determine the necessary input values for any particular result.

## Tests

We've tested the algorithm's properties for:

- Uniform distribution by comparing the results against a reference square distribution.
- Lack of serial correlation by testing a sequence of results and finding that the correlation
  of any two results in the sequence is zero.

## Caveats

This method should **not** be used in cases where all of the following applies:

- There is a chance to win less than 1%.
- The value of the prize is high.
- The potential winner is the one executing the transaction to play.

This is because it's possible to improve lower odds up to about 1% if you can 
control the timing of when you play. More specifically, you can predict the timing when
you have a 1-in-100 chance of winning even the rarest of prizes.

As long as the play is being executed by an unbiased party other than the potential winner,
this caveat does not apply.
