---
title: Core
autonav:
   group: Other Contracts
---

# Core

<Dapp url="https://app.blockwell.ai/core">Core</Dapp>

## Introduction

Blockwell Core is a system for posting and managing work items on the
blockchain. It can be used as a task manager, for project management,
outsourcing work, and much more.

Holders of the Core token have the power to offer **rewards for completing
items**, and then approving completed work as well as **contesting work**
that wasn't done correctly.

Users who complete approved work **build up their Core holdings** over time,
which in turn give them **more governance power**. Others who are **inactive**
for too long see their holdings slowly **burned away**. This turns it into
a **self-healing DAO**, where those who consistently provide value are
rewarded.

::: tip
Blockwell Core is built to be extensible. Find out about
[**Freelance Core**](./freelance.md), a Core extension built for freelancing
work.
:::

## Life of a Task

A work item enters the Core system as a ***Task***. A Task is basically what
you'd expect, with a title, and a description of what's required to complete
it.

In addition, a Task has a set reward. This is how much Core the user who 
completes the task will receive.

Who can create Tasks varies depending on the configuration of the specific
Core contract, but typically you need to have some minimum amount of
Core before you can create a Task. For details on the configuration options,
see [configuring Core](./configuring.md).

The **maximum reward** you can set for a Task is **limited** by the amount of
Core you hold, so earning **more Core** will also allow you to give **greater
rewards**, thus prioritizing work you deem important.

### Efforts

Once a Task has been created, it waits in an open state for someone to start
work on it. Anyone who has access to the Core contract can claim the Task
by **creating an *Effort***.

An Effort represents your intent to complete a given Task, it shows that
you are working on it to others.

It also acts as a form of **commitment** to completing the Task, because **if
you don't complete** it in due time, you will be [penalized](#penalties).
This gives the Tasks creator more confidence in spending their time to help
you complete the Task, since you now have a vested interest in it.

#### Effort Competition

In Blockwell Core, no one can have a sole claim to a Task. Even if an Effort
has already been started on a Task, a **competing Effort can be created** by
someone else.

This is necessary to prevent a small group of users from manipulating the
system by preventing others from working on Tasks, but it also allows for
a mechanism for competition.

Efforts can also be **cooperated** on. The creator of an Effort can add others
as ***Collaborators*** to the Effort. When [rewards](#earning-rewards) are
paid out, all collaborators receive an equal share of the main reward.

### Completing Efforts

After completing the work on a Task, you **Complete the Effort** by
marking it complete and submitting proof of its completion.

Once a Task has a completed Effort, it is shown as *Needing Approval* to
the rest of the community.

### Approving Efforts

Once an Effort is completed, anyone who's **not the creator** of the Task 
**or involved in the Effort** can vote to approve it.

That means an **independent third party is required** to take the Task to
completion. It can be anyone who holds tokens in the same Core contract.

If you're acting as the third party to an Effort, you're **expected to
examine** the Task's **description** as well as the **proof submitted**
with the  completion of the Effort. If you believe the work was **done 
correctly**, you can **vote to approve** it.

Once the **Effort receives enough votes** to be fully approved, both the
Effort and the Task will be **marked as complete**, and 
[rewards are paid out](#earning-rewards).

### Contesting Efforts

To guard against abuse, all approved **Efforts can be contested**. When
someone contests an Effort, it is brought to another round of voting, and
**each member of the community can weigh in** if they believe the Task and
Effort to be valid or invalid.

For an Effort to be considered *Invalid*, the contesting side must receive a
**super-majority of votes** (66%). If that happens, the Effort will be 
**marked Invalid**, the Task reopened, and everyone who **contributed** work
or **approved** the Effort will be [penalized](#penalties).

If the contest doesn't receive the required votes, the Effort will remain
completed, and the **contesters will be [penalized](#penalties) instead**.

::: tip
The exact numbers depend on the [configuration](./configuring.md) of the
specific Core contract, but typically the penalty for being an approver on
an invalid Effort is more severe than when the vote to contest fails.
This is to discourage bad approvals from happening in the first place.
:::

### Comments

A key part of any task system is being able to communicate. Core features
a comment system where anyone can leave a comment on a Task, and like
everything else, the comments are on the blockchain.

## Voting

All voting in Core is based on the amount of tokens held when casting a vote.
This includes voting to approve Efforts, voting to contest Efforts, and
voting on governance.

**<center>1 Core = 1 Vote</center>**

When you vote for something, one vote is cast for each Core token you hold.

## Earning Rewards

There are three primary ways to earn Core:

1. As a **Collaborator** on an approved Effort you receive an equal share of
   the reward set by the Task's creator.
2. As the **Creator of a Task** that's completed, you receive a 
   [configured](./configuring.md) percentage of the Task's reward. By
   default this is 15%.
3. As an **Approver**, you receive a [configured](./configuring.md) percentage
   of the Task's reward when an Effort you approved gets fully approved.
   By default this is 10%.
   
For example, when:

- Alice creates a Task with a reward of 1000 Core.
- Bob creates and completes an Effort on that Task.
- Charlie approves Bob's Effort.

Then:

- Bob receives a 1000 Core reward for completing the work.
- Alice receives a 150 Core reward for the effort of creating and specifying
  the Task.
- Charlie receives a 100 Core reward for spending the effort of verifying
  the Task was completed correctly.
  
Lastly, there is a fourth way to earn a small amount of Core as a reward for 
[triggering the next period](#periods), discussed in [Periods](#periods).

## Penalties

Bad behavior is discouraged through applying penalties. Having a penalty
**prevents you from earning** Core until the full amount of the **penalty is
paid**. Any Core rewarded is first applied to your penalty.

For example, if you have a penalty of 100 and are rewarded 500 Core, your
penalty would go to 0, and you'd receive the remaining 400 Core.

There are currently four possible ways to receive a penalty:

1. As the **Creator of an Effort** that is not completed within the
   [configured](./configuring.md) time frame, by default 2-4 weeks. The
   amount penalized is also configurable, but defaults to 10% of the Task's
   reward.
2. As a **Collaborator** on an Effort that is contested and voted invalid.
   The amount defaults to 110% of the reward for finishing the Task.
3. As an **Approver** of an Effort that is contested and voted invalid. The
   amount defaults to 50% of the Task's
   reward. Since approvers receive a 10% reward, the penalty is 5 times the
   potential reward.
4. As a **Contester** when after having contested an Effort, the Effort is
   voted to be valid. The amount defaults to be equal to the Task's reward.
   
## Periods

Each Core contract has a [configured](./configuring.md) period of time 
it works in, which by default is 14 days. **Everything time-dependent in
Core works in periods**, including:

- Time limits for completing Efforts.
- Window of opportunity to contest an approved Effort.
- The voting period for contested Efforts.
- [Burning](#core-burning) inactive users.
- Archiving old completed Tasks.

After a period has ended, the contract waits for someone to **trigger the
next period**. This can be anyone who's currently holding the Core tokens,
and whoever calls it first will **receive a small amount of Core** as an
**incentive**.

::: detail
One of the main reasons why Core uses periods rather than just keeping
track of time is because Ethereum on its own has no concept of triggering
actions at specific times. For instance, the contract on its own can't
react to an Effort hitting its time limit.

That means something from outside the chain needs to call the contract
to trigger it. Those are often called Oracles in the Ethereum world.

Core solves the issue by only requiring an external call once every period,
and by allowing anyone that's part of the community to do it in return for
a reward.
:::

## Core Burning

The Core holdings of **inactive users** are slowly **burned away** over time. This
helps ensure the **community keeps moving forward** continuously, and it **rewards
consistent effort** over just sitting on a large amount of tokens.

::: tip
Burning is an **optional** feature in Core, and can be turned off.
:::

Anyone who doesn't **earn** at least a certain **minimum amount of Core** during
a [period](#periods) will have some of their **tokens burned**. The amount
of tokens burned can be [configured](./configuring.md) to be either a 
percentage of their tokens, or a specific amount.

This burning mechanism means that over time the users who are most
active in the community have the most control over its governance.

## Learn More

- [**Configuring Core**](./configuring.md)
- [**Freelance Core**](./freelance.md)
- [**Content Encryption**](./encryption.md)
