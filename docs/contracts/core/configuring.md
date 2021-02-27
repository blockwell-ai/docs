---
title: Configuring Core
---

# Configuring Core

Most of [Blockwell Core](./README.md)'s features have configuration options to 
let you **tailor Core** for a variety of **different needs**. You can find a 
comprehensive list of the different options below, along with the technical 
name and **default value in code**.

Changing configuration options is currently limited to administrator
accounts, with DAO governance options coming in the near future.

At any time the **configuration can be locked**, after which point it can
never be changed again. This is to enable **fully trustless** use cases.

#### Period Length
```solidity
periodLength = 14 days
```

The length of a single [period](./README.md#periods).

#### Period Minimum
```solidity
periodMinimum = 12000
```

The minimum amount of Core a user needs to earn to not be burned. When
this is set to `0`, burning is disabled.

#### Burn Percentage
```solidity
burnPercentage = 10
```

The percentage of Core tokens burned from an account that did not meet
the [Period Minimum](#period-minimum).

#### Burn Amount
```solidity
burnAmount = 0
```

A set amount of tokens to burn from accounts that do not meet the
[Period Minimum](#period-minimum).

If this is non-zero, Burn Percentage is ignored and not used.

When this is set to `0`, Burn Percentage is used instead.

#### Burn All Balance
```solidity
burnAllBalance = 500
```

When someone's Core tokens are burned below this number, the
[Burn Percentage](#burn-percentage) and [Burn Amount](#burn-amount)
options are ignored, and the entire remaining balance is burned instead.

This option exists to ensure that eventually a user who keeps getting
burned is removed entirely, rather than a percentage being taken off
to infinity.

#### Next Period Reward
```solidity
nextPeriodReward = 2000
```

The Core reward given to the first account to trigger the next
[period](./README.md#periods).

#### Minimum Create Balance
```solidity
minimumCreateBalance = 20000
```

The minimum amount of Core required to be able to post new Tasks.

Users with less than this minimum can still earn Core by performing and
approving Efforts.

#### Task Reward Factor
```solidity
taskRewardFactor = 15
```

This factor determines the maximum reward a user can set on a new Task.
Their Core balance has to equal to or higher than the reward times this
factor.

For example, given the default factor of `15`, you would need to have
at least 30,000 Core to create a Task with a reward of 2,000 Core, because
15 times 2,000 is 30,000.

#### Task Creator Reward Percentage
```solidity
taskCreatorReward = 15
```

When a Task is completed successfully, the Task's original creator receives
a reward. This reward compensates them for the work required to create
and specify a Task.

The reward is calculated as a percentage of the Task's reward.

For example, with the default 15%, a Task with a reward of 2,000 Core would
give its creator 300 Core.

#### Approval Reward Percentage
```solidity
approvalReward = 10
```

When a Task is voted fully approved, everyone who voted to approve the
Effort receives a reward. The reward is a percentage of the Task's reward,
as specified by this option.

As an example, the default value of 10% would mean a Task with a reward of
2,000 Core would reward the approvers 200 Core each.

#### Task Period Limit
```solidity
taskPeriodLimit = 1
```

This determines how long an Effort in a Task can remain in progress before
it's considered failed.

An Effort fails if, at the end of a period, it was created more periods ago
than this limit.

For example, with the default of `1`, let's say an Effort is created on
period 10. The Effort will fail at the end of Period 12, because it was
created more than `1` period ago.

#### Approval Factor
```solidity
approvalFactor = 5
```

The amount of votes needed to approve a completed Effort is determined
by multiplying the Task's reward with this factor.

For example, a Task with a 2,000 Core reward would require 10,000 votes
to be fully approved. Those votes can be cast by a single user with
enough tokens, or multiple users combined.

#### Failure Factor
```solidity
failureFactor = 10
```

When an Effort on a Task fails because it didn't get finished within the
[Task Period Limit](#task-period-limit), the penalty is calculated by
dividing the Task's reward by this factor.

For example, a Task with a 2,000 Core reward would impose a 200 Core
penalty when an Effort on the Task fails.

The penalty is applied to the user who created the Effort.

#### Contest Periods
```solidity
contestPeriods = 1
```

After an Effort is completed and approved, this option
determines the window of time in which others can contest the approval.

For example, with the default value of `1`, there is always at least one
full period in which the Effort can be contested.

In addition, if someone contests an Effort within 48 hours of this time
limit, the voting for the contesting is extended for another full period.
This is to make sure there's always at minimum a 48 hour period for others
to cast their votes when something is contested.

#### Failed Contest Penalty Percentage
```solidity
failedContestPenalty = 100
```

When an Effort is contested and the contest fails due to not receiving enough
votes, a penalty is applied to everyone who voted to contest. This option
determines the percentage of the Task's reward to be used as a penalty.

The default of 100% means the penalty is equal to the reward of the Task.

#### Invalid Penalty Percentage
```solidity
invalidPenaltyPercentage = 110
```

When an Effort is successfully contested to be invalid, a penalty is
applied to all collaborators on the Effort. This option determines the
penalty amount as a percentage of the Task's reward.

For example, given the default 110%, a Task with a 2,000 Core reward would
apply a 2,200 Core penalty.

The penalty is divided equally between all Collaborators so that it's
always based on the reward each Collaborator received for the Task's
completion.

#### Approval Penalty Percentage
```solidity
approvalPenalty = 50
```

When an Effort is successfully contested to be invalid, a penalty is
applied to all who voted to approve the Effort. The penalty is calculated
as a percentage of the Task's reward.

For example, with the default 50%, a Task with a 2,000 Core reward would
apply a 1,000 Core penalty to all approvers.

This penalty is significantly higher than the amount of Core approvers
stand to gain. This is to discourage approving incorrect or poor work,
since that's at a higher risk of being contested.


