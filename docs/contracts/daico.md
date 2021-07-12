---
title: Daico
sidebarDepth: 2
autonav:
  group: Other Contracts
---

# Daico

<Deployer code="iekryy">Daico Contract</Deployer>

<Dapp url="https://app.blockwell.ai/daico">Daico</Dapp>

## Introduction

The Daico contract is a special kind of contract that enables you to make
payments from a pool of funds in batches, where each batch needs to be
approved by a group of voters you designate.

Daico supports any kind of [Voting Structure](#voting-structures) needed for
your use case, from budget management by a committee to community funding.

### Proposals

Funds from a Daico are accessed using Proposals.

Proposals specify the amount of funds needed, and describe what those funds
will be used for. The Proposal will then be voted on according to the Daico's
configured [voting structure](#voting-structures), and if approved, the funds
will be paid out.

Proposals can have a one-time payment, or periodic payments. If a Proposal is
periodic, the payments will continue until it's voted to stop.

### Funding

#### No Minimum Funding

By default, the Daico will be launched from the start, and all
funds sent to it will be available immediately for [proposals](#proposals).

#### Funding Goal

A Daico contract can be set up with a starting Funding Goal. When set, the
Daico requires a minimum amount of funds to be sent to it for the Daico
to launch.

If the minimum amount is not met, everyone who sent funds will be refunded.
With this setup it acts like a kickstarter project.

Along with a Funding Goal, a Time Limit can be set. The Time Limit requires
that the Funding Goal is met by the given time or the Daico will be forced
to fail and users are refunded.


### Voting Structures

Daico supports three different voting systems.

#### 1. Fixed

The simplest method is Fixed votes where a specific set number of votes are always
needed to approve a proposal.

For example, if Fixed Voting is set to 3, then three people would need to vote
to approval a [proposal](#proposals) for payments to be made.

#### 2. Percentage

With Percentage voting, each proposal needs to meet the configured percentage of
votes from the total pool of possible votes in order to be approved.

For example, if you wanted a simple majority for approval, you could set this to
51%.

#### 3. External

With the External option, determining the ability to vote and vote counts are
handed off to another contract, which can implement any kind of voting system.
