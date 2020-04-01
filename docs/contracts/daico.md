---
title: Daico
sidebarDepth: 2
---

# Daico

## Introduction

The Daico contract is a special kind of contract that enables you to make
payments from a pool of funds in batches, where each batch needs to be
approved by a group of voters you designate.

Only once the required number of votes have been cast the funds are
transferred.

The basic flow is as follows.

**1. Setup the contract**

- First, you deploy the Daico contract and set the type of asset it uses.
  This can be any ERC20 token.
- You set the number of votes needed for a payment to be made.
- You set the amount of tokens that will be sent as a payment.

Once deployed, you will be made the admin of the contract.

**2. Send the contract the funds**

You can send as many tokens to the contract as you'd like. Only you as the
admin can withdraw tokens from the contract, so they're as safe in the
contract as in your wallet.

**3. Designate voters**

You designate wallets as voters, and then the owners of those wallets can
cast votes on making payments.

**4. Create payment suggestion**

Then at any point you can create suggestions for a payment to be made.
When your voters have cast the necessary number of votes, a payment will
be made.

You can manually create suggestions when needed, or they can be automated
using a delegate account.

## Deployer

Here are QR Codes for deploying a Daico contract on the Rinkeby Test Network 
([what are deployers?](./blockwell-contracts.md#what-are-deployers)).

If you want to test the Daico contract but you don't have any tokens on
Rinkeby, [use our Prime Token Deployer to create one](./prime.md#deployer).

After you deploy the Daico contract, you will receive an email the necessary
QR Codes to finish setting it up. For a more detailed walkthrough, see below.

<Qr code="m0jxgn">Deploy Daico (Rinkeby)</Qr>

## Using Daico

### 1. Scan the QR Code

Start by scanning one of the QR Codes above. We recommend starting with
Rinkeby, since using it is free.

A form will open with the following fields:

- **Token Address** enter the address of the token you want to send as 
  payment. You can use any token as long as you have some of those tokens
  to send to the contract.
- **Vote Threshold** enter the number of votes needed for a payment to be 
  made. If you're just testing, you can set this to 1 so you can meet the 
  threshold on your own.
- **Token Amount** enter the amount of tokens each payment should be.

Press ACCEPT, and in a few moments the transaction should succeed.

### 2. Check email

Shortly after succeeding, you will receive an email with information on
your new Daico contract as well as some additional QR Codes for using
the contract.

### 3. Transfer tokens

Before Daico can make payments, you'll need to give it some of the
tokens you're using. Simply scan the QR Code in your Daico email called
"Transfer Tokens".

It will ask you for the amount of tokens. You can send whatever amount
you wish, but it should be more than the **Token Amount** you set in the
first step so that the contract can make a full payment.

Press **ACCEPT**.

::: tip
You can always send more tokens later for future payments as well. To
send more tokens simply repeat this step.
:::

### 4. Add voters

Next, add voters to the contract by scanning the "Add Voter" QR Code 
from the email. You'll need to add at least as many voters as the 
threshold you set.

Press **ACCEPT** and wait for each voter addition to succeed.

::: tip
Note that you as the admin are not automatically added as a voter. 
To add yourself copy your wallet address:

- On Android, tap your "Wallet Address" on the home screen.
- On the web, select and copy your address from the Wallet page.

Then use that as the address in the Add Voter form.
:::

### 5. Create suggestion

In order for a payment to be made, you must first create a suggestion 
for a payment to be made. Once a suggestion is in place, your voters 
can vote to accept the suggestion. Once enough votes have been cast 
to meet the threshold you set in step 6, a payment will be made to 
the creator of the suggestion.

Scan the "Create Suggestion" QR Code and enter a text for the suggestion. 
The text can be anything you want, for example "First Payment".

Press **ACCEPT** and wait for the transaction to succeed.

::: tip
You can create as many suggestions as you want, and each one will send 
the payment for the amount of tokens you configured in Step 1 when 
the threshold is met.
:::

### 6. Share vote QR Code

On the confirmation screen for the Create Suggestion, the app will 
let you view or share a QR Code to vote on the suggestion.

Note that the app will ask for file storage permissions in order 
to create the QR Code for sharing.

::: tip
If you want to vote using your own account without sharing, you can 
press VIEW VOTING QR CODE. This will take you to a page with the 
Deep Link that you can press.
:::

### 7. Vote

Each voter should then scan the voting QR Code you shared and cast
their vote. Once the necessary number of votes have been cast, as
determined by the **Vote Threshold** you set in the first step, a
payment will be made.

Whenever a payment is made, it will always be sent to the wallet that
created the suggestion.
